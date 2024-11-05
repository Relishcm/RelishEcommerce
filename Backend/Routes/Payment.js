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
        const { products, username, email, address, phone } = req.body;

        const amount = products.reduce((acc, product) => acc + product.discountPrice * product.quantity, 0) * 100; 
        const currency = 'INR';
        const receipt = crypto.randomBytes(10).toString("hex");
        
        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount,
            currency,
            receipt,
            payment_capture: 1 
        });

        // Save order to database
        const order = await Order.create({
            username,
            email,
            address,
            phone,
            razorpayOrderId: razorpayOrder.id, 
            orders: products
        });

        res.json({ orderId: razorpayOrder.id, message: 'Order created successfully!' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});


// Verify Payment
paymentRouter.post('/razorpay-payment-verification', async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    try {
        const sign = orderId + "|" + paymentId;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

        if (expectedSign === signature) {
            const order = await Order.findOne({ razorpayOrderId: orderId }); 
            if (order) {
                // Update payment status and time
                order.paymentStatus = 'completed';
                order.paymentTime = new Date();
                
                // Calculate delivery time as 7 days from now
                order.deliveryTime = new Date();
                order.deliveryTime.setDate(order.deliveryTime.getDate() + 7); 

                await order.save();
                return res.json({ message: 'Payment successful! Order status has been updated.' });
            } else {
                return res.status(404).json({ message: "Order not found." });
            }
        } else {
            return res.status(400).json({ message: "Payment verification failed." });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        return res.status(400).json({ message: "Payment verification failed.", error: error.message });
    }
});


// Fetch Order

paymentRouter.get('/showorder', Auth, async (req, res) => {
    const { orderId } = req.query;
    const userId = req.userId;  // from Auth middleware (you set it on req.userId)

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required." });
    }

    try {
        // Find the order by orderId and userId
        const order = await Order.findOne({ _id: orderId, userId: userId });
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Return order details
        res.json({
            username: order.username,
            email: order.email,
            address: order.address,
            phone: order.phone,
            razorpayOrderId: order.razorpayOrderId,
            paymentStatus: order.paymentStatus,
            paymentTime: order.paymentTime,
            deliveryTime: order.deliveryTime,
            orders: order.orders
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = paymentRouter;
