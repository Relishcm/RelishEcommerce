const express = require('express');
const cors = require('cors');
const { Order } = require('../Modal/PaymentModal');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Auth = require('../Middleware/AuthMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET 
});

const paymentRouter = express.Router();

// Create Order
paymentRouter.post('/razorpay-order', async (req, res) => {
    try {
        const { products, username, email, address, phone, pincode, state, city, userId, paymentMethod } = req.body;

        // Ensure that the userId is provided
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        // Calculate the order amount (convert to paise)
        const amount = products.reduce((acc, product) => acc + product.discountPrice * product.quantity, 0) * 100;
        const currency = 'INR';
        const receipt = crypto.randomBytes(10).toString("hex");

        let razorpayOrderId = null;

        if (paymentMethod === 'online') {
            // Create a Razorpay order
            const razorpayOrder = await razorpay.orders.create({
                amount,
                currency,
                receipt,
                payment_capture: 1 
            });
            razorpayOrderId = razorpayOrder.id;
            const order = await Order.create({
                userId,
                username,
                email,
                address,
                phone,
                city,
                state,
                pincode,
                razorpayOrderId, 
                paymentMethod,
                orders: products
            });
    
            res.json({ 
                orderId: razorpayOrderId,
                message: 'Order created successfully!',
                paymentMethod 
            });
        }

        if (paymentMethod === 'cash') {
            const deliveryTime = new Date();
            deliveryTime.setDate(deliveryTime.getDate() + 7);

            const cashOrder = await Order.create({
                userId,
                username,
                email,
                address,
                phone,
                city,
                state,
                pincode,
                deliveryTime,  
                paymentMethod: 'cash',
                orders: products
            });

            // Return the order details including the delivery time
            return res.json({
                orderId: cashOrder._id,  // The newly created order's ID
                deliveryTime: cashOrder.deliveryTime,
                message: 'Cash order created successfully!',
                paymentMethod: 'cash'
            });
        }
   
        
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});




// Verify Payment
paymentRouter.post('/razorpay-payment-verification', async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    try {
        console.log('Received request for payment verification:', req.body);

        const order = await Order.findOne({ razorpayOrderId: orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        console.log('Fetched order:', order);

        if (order.paymentMethod === 'online') {
            console.log('Processing Razorpay payment verification for order:', orderId);

            const sign = orderId + "|" + paymentId;
            const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest("hex");

            console.log('Generated expected signature:', expectedSign);
            console.log('Received signature:', signature);

            if (expectedSign === signature) {
                order.paymentStatus = 'completed';
                order.paymentTime = new Date();
                order.deliveryTime = new Date();
                order.deliveryTime.setDate(order.deliveryTime.getDate() + 7); 
                await order.save();
                return res.json({ message: 'Payment successful! Order status has been updated.' });
            } else {
                console.log('Payment verification failed: Signatures do not match');
                return res.status(400).json({ message: "Payment verification failed." });
            }
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        return res.status(400).json({ message: "Payment verification failed.", error: error.message });
    }
});



paymentRouter.get('/showorders',Auth, async (req, res) => {
    // const { userId } = req.query;
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Find all orders associated with the userId
        // const orders = await Order.find({ userId }).populate('userId', 'username email'); // Populate user details
        const orders = await Order.find({ userId: userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        // Return relevant order details
        res.json({
            orders: orders.map(order => ({
                orderId: order._id,
                username: order.username,
                email: order.email,
                address: order.address,
                phone: order.phone,
                razorpayOrderId: order.razorpayOrderId,
                paymentMethod:order.paymentMethod,
                paymentStatus: order.paymentStatus,
                paymentTime: order.paymentTime,
                deliveryTime: order.deliveryTime,
                items: order.orders, // List of items in the order
            }))
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



module.exports = paymentRouter;
