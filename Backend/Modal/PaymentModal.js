const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    discountPrice: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["card", "cash", "upi"],
        default: "card"
    },
    paymentTime: Date,
    deliveryTime: Date,
    orders: [orderItemSchema],
    userId: { // Reference to user who placed the order
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User collection
        required: true
    }
});

const Order = mongoose.model('OrderPayment', orderSchema);

module.exports = { Order };
