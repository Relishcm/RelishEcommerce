const express = require("express");
const multer = require("multer");
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const Auth = require("../Middleware/AuthMiddleware");
const { GarmentsProduct, garmentsstorage } = require("../Modal/GarmentsModal");
require("dotenv").config();

const GarmentsProductRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.array("filename",4)];

GarmentsProductRouter.post("/addGarmentsProduct", multiple, async (req, res) => {
  console.log("multiple", multiple);
  const body = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: "No files uploaded" });
  }

  try {
    const downloadURLs = [];

    for (let i = 0; i < req.files.length; i++) {
      const storageRef = ref(garmentsstorage, `GarmentsProduct/${req.files[i].originalname}`);
      const metadata = {
        contentType: req.files[i].mimetype,
      };

      const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);

      downloadURLs.push(downloadURL);
    }

    while (downloadURLs.length < 4) {
      downloadURLs.push(""); 
    }

    const product = await GarmentsProduct.create({
      Productcategory:body.Productcategory,
      category: body.category,
      name: body.name,
      description: body.description,
      stock: body.stock,
      price: body.price,
      discountPrice: body.discountPrice,
      image: downloadURLs[0],
      image1: downloadURLs[1],
      image2: downloadURLs[2],
      image3: downloadURLs[3],
      size: body.size,
 
    });

    return res.json({
      msg: "Upload successful",
      files: req.files.map((file) => file.originalname),
      downloadURLs: downloadURLs,
      data: product._id.toHexString(),
    });
  } catch (error) {
    console.error("Firebase Storage Error:", error.code, error.message);
    return res.status(403).json({ msg: "Error uploading files" });
  }
});




GarmentsProductRouter.get("/getallgarmentsproducts", async (req, res) => {
  try {
    const products = await GarmentsProduct.find({})
    return res.json({ products: products })
  } catch (error) {
    return res.status(403).json("error while gettign products")
  }
})



module.exports = GarmentsProductRouter;




