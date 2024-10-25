const mongoose = require('mongoose');


const wishSchema= new mongoose.Schema({
    userId: {
      type: String,
      required: true
  
    },
    productId: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true
    }],
    category:{
        type: String,
        required: true
      },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
      type: Number,
      required: true
      
    },
    discountPrice:{
      type: Number,
      required: true
    },
  
    image:{
      type: String,
      required: true
    }
  });
  const Wish = mongoose.model("wish",wishSchema)

module.exports = { Wish };
