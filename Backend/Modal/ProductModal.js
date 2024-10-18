const { initializeApp } = require("firebase/app") ;
const { getStorage } = require("firebase/storage");

const mongoose = require('mongoose') ; // Ensure mongoose is imported

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

const productSchema = new mongoose.Schema({
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
  category: {
    type: String,
    trim: true
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

// Optional: Add pre-save middleware to update `updatedAt`
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Optional: Add a virtual field to calculate the final price
productSchema.virtual('finalPrice').get(function() {
  return this.discountPrice > 0 ? this.discountPrice : this.price;
});

const Product = mongoose.model('Product', productSchema);

module.exports = {  Product,storage};
