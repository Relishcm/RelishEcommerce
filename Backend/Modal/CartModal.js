const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true

    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    discountPrice: {
        type: Number,
        required: true

    },
  
    description: {
        type: String,
        required: true
    },
   
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    size: {  
        type: String,  
        required: false,
        enum: ['M', 'L', 'XL', 'XXL'],
 

    }
});

const Cart = mongoose.model("cart", cartSchema)


module.exports = { Cart };
