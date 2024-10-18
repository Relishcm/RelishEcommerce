const express = require("express");
const multer = require("multer");
const { ref,uploadBytesResumable,getDownloadURL} = require("firebase/storage");
const {  storage, Product } = require("../Modal/ProductModal");

const Auth = require("../Middleware/AuthMiddleware");
require("dotenv").config();

const ProductRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single("filename")];

ProductRouter.post("/addProduct", multiple, async (req, res) => {
    console.log("multiple",multiple)
  const body = req.body;
  if (!req.file) {
    console.log("file not uploaded");
  }
  try {
    const storageRef = ref(storage, `products/${req.file.originalname}`);

    const metadata = {
      contentType: req.file.mimetype
    };
  
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

      const product = await Product.create({
        name: body.name,
        description:body.description,
      category: body.category,
      stock:body.stock,
      price: body.price,
      discountPrice: body.discountPrice, 
      image: downloadURL
    });

    return res.json({
      msg: "upload successfully",
      name: req.file.originalname,
      downloadURL: downloadURL,
      data: product._id.toHexString()
  })
    
  } catch (error) {
    console.error("Firebase Storage Error:", error.code, error.message);
    return res.status(403).json({ msg: "Error uploading file" });
  }
  
});


ProductRouter.get("/getallproducts", async(req,res)=>{
  try {
      const products = await Product.find({})
       return res.json({products: products})
  } catch (error) {
      return res.status(403).json("error while gettign products")
  }
})



module.exports = ProductRouter;




