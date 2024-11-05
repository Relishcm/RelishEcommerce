const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema({
  
    discountPrice:{
      type: Number,
      required: true
      
    },
    name:{
        type: String,
        required: true
      },
    category:{
      type: String,
      required: true
    },
    // image:{
    //   type: String,
    //   required: true
    // },
    quantity: {
      type: Number,
      required: true,
      min: 1 
    }
  });
  
  const orderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
  
    },
    username:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
  
    },
    razorpayOrderId: { 
      type: String,
       required: true 
      },

    paymentStatus:{
      type:String,
       enum:["pending","completed","failed"],
      default:"pending"
     
  },
  paymentMethod:{
      type:String,
      enum:["card", "cash", "upi"],
      default:"card"
  },
  
  // paymentToken:String,
  // paymentMode:String,
  // currency:String,
  paymentTime:Date,
  deliveryTime: Date,
  
    orders: [orderItemSchema] 
  });
  const Order = mongoose.model('OrderPayment', orderSchema);

module.exports = {  Order };
