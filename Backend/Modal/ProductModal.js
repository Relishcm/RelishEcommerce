const { initializeApp } = require("firebase/app") ;
const { getStorage } = require("firebase/storage");

const mongoose = require('mongoose') ; 
const firebaseConfig = {
  apiKey: "AIzaSyDYLnccO_kXVjnZ89zBBVucmJ2P4S4kPJM",
  authDomain: "relish-42e92.firebaseapp.com",
  projectId: "relish-42e92",
  storageBucket: "relish-42e92.appspot.com",
  messagingSenderId: "584358685743",
  appId: "1:584358685743:web:d70cccedc728147fe1eada"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const MobileproductSchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    default: 0
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


MobileproductSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


MobileproductSchema.virtual('finalPrice').get(function() {
  return this.discountPrice > 0 ? this.discountPrice : this.price;
});

const MobileProduct = mongoose.model('MobileProduct', MobileproductSchema);

module.exports = {  MobileProduct,storage};
