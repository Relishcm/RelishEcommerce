const express = require("express");
const cors = require("cors");
const Auth = require("../Middleware/AuthMiddleware");
const { Cart } = require("../Modal/CartModal");


const app = express();
app.use(cors());
app.use(express.json())
require("dotenv").config()
const cartRouter = express.Router()


cartRouter.post("/addcart", Auth, async (req, res) => {
    const { price, category, image, productId, quantity, discountPrice, description, name } = req.body;
    const userId = req.userId;

    if (!price || !quantity || !category || !image || !productId || !discountPrice || !description || !name ) {

        return res.status(400).json({
            msg: "Missing required fields",
            fields: { price, quantity, category, image, productId, discountPrice, description, name }
        });
    }
    // console.log("Request Body:", req.body);

    if (quantity < 1) {
        return res.status(400).json({ msg: "Quantity must be at least 1" });
    }

    try {
        const existingItem = await Cart.findOne({
            productId: productId,
            userId: userId
        });

        if (existingItem) {
            return res.status(403).json({ msg: "Item already in cart" });
        }

        const newItem = await Cart.create({
            category,
            name,
            description,
            price,
            discountPrice,
            image,
            userId,
            productId,
            quantity,
           
        });


        return res.status(201).json({ msg: "Item added to cart", data: newItem });
    } catch (error) {
        console.error("Error while adding to cart:", error);
        return res.status(500).json({ msg: "Error while adding item to cart" });
    }
});





cartRouter.get("/cart", Auth, async (req, res) => {
    const userId = req.userId;
    try {
        const items = await Cart.find({ userId: userId });
        if (!items) {
            return res.status(404).json({ message: "No items found." });
        }
        res.json({ items });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Server error" });
    }
});

cartRouter.post("/removeCart", Auth, async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;

    if (!productId) {
        return res.status(400).json({ msg: "Product ID is required" });
    }

    try {
        const result = await Cart.findOneAndDelete({ productId, userId });
        if (result) {
            return res.status(200).json({ msg: "Item removed from Cart" });
        } else {
            return res.status(404).json({ msg: "Item not found in Cart" });
        }
    } catch (error) {
        console.error("Error removing item from wishlist:", error);
        return res.status(500).json({ msg: "Error removing item from Cart" });
    }
});

cartRouter.get('/count', Auth, async (req, res) => {
    try {
        const userId = req.userId;
        const count = await Cart.countDocuments({ userId });
        res.json({ count });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

cartRouter.get('/cartcheckStatus/:productId', Auth, async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.userId; 
  
      const cartListItem = await Cart.findOne({ userId, productId });
  
      if (cartListItem) {
        res.json({ isInCart: true });
      } else {
        res.json({ isInCart: false });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Update Quantity
cartRouter.put('/addquantity', Auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const cartItem = await Cart.findOne({ productId, userId });
        if (!cartItem) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        // Update quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        // Calculate total price after updating the quantity
        const totalPrice = await calculateTotalPrice(userId);

        res.status(200).json({ msg: 'Quantity updated successfully', item: cartItem, totalPrice });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Helper function to calculate total price
const calculateTotalPrice = async (userId) => {
    const cartItems = await Cart.find({ userId });
    return cartItems.reduce((total, item) => {
        return total + (item.discountPrice * item.quantity);
    }, 0);
};

// Get Total Price
cartRouter.get('/totalprice', Auth, async (req, res) => {
    try {
        const userId = req.userId;
        const totalPrice = await calculateTotalPrice(userId);
        res.status(200).json({ totalPrice });
    } catch (error) {
        console.error('Error calculating total price:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});




// cartRouter.post("/order", Auth, async (req, res) => {
//   const { name, email, address, phone, orders } = req.body;


//   console.log("Received order data:", req.body);

//   try {
//     const response = await Order.create({
//       name,
//       email,
//       address,
//       phone,
//       orders
//     });
//     console.log("Order saved:", response);

//     return res.json({ msg: "Order Done", order: response });
//   } catch (error) {

//     console.error("Error saving order:", error);
//     return res.status(403).json({
//       msg: "Error while adding order",
//       error: error.message 
//     });
//   }
// });




module.exports = cartRouter