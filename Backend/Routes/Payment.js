// const express = require('express');
// const cors = require('cors');
// const { Order } = require('../Modal/PaymentModal');



// const app = express();
// app.use(cors());
// app.use(express.json());
// require("dotenv").config()

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// const paymentRouter = express.Router();


// paymentRouter.post('/checkout-session', async (req, res) => {
//     try {
        
//         const { products, username, email, address, phone   } = req.body;

//         const order = await Order.create({
//             username,
//             email,
//             address,
//             phone,
         
//             orders: products
//         });
//         console.log("order :",order)

//         const line_items = products.map(product => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: product.category,
//                     name: product.name,
                    
//                 },
//                 unit_amount: product.discountPrice  * 100,
//             },
//             quantity: product.quantity,
//         }));

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `http://localhost:5173/SuccessPayment?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: 'http://localhost:5173/CancelPayment',
//             metadata: {
//                 orderId: order._id.toString() 
//             }
//         });
//         // console.log("session :", session);

//         res.json({ sessionId: session.id });

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// paymentRouter.get('/success', async (req, res) => {
//     try {
//         const sessionId = req.query.session_id;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         if (session.payment_status === 'paid') {
//             const orderId = session.metadata.orderId;
      
//             console.log('Retrieved Order ID from metadata:', orderId);

//             const order = await Order.findOne({ _id: orderId });  
//             if (order) {
//                 order.paymentStatus = 'completed';
//                 order.paymentTime = new Date();

                
//                 await order.save();
//                 console.log('Order updated:', order);
//                 res.send('Payment successful! Order status has been updated.');
//             } else {
//                 console.error('Order not found:', orderId);
//                 res.status(404).send('Order not found.');
//             }
//         } else {
//             res.send('Payment failed or was not completed.');
//         }
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// paymentRouter.get('/showorder', async (req, res) => {
//     const {orderId} = req.query;

//     if (!orderId) {
//         return res.status(400).json({ message: "Order ID is required." });
//     }

//     try {
      
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found." });
//         }

//         res.json(order);
//     } catch (error) {
//         console.error("Error fetching order:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });




// module.exports = paymentRouter;






const express = require('express');
const cors = require('cors');
const { Order } = require('../Modal/PaymentModal');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key id
    key_secret: process.env.RAZORPAY_KEY_SECRET // Your Razorpay key secret
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
                order.paymentStatus = 'completed';
                order.paymentTime = new Date();
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
paymentRouter.get('/showorder', async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required." });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = paymentRouter;
