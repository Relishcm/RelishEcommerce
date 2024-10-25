const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())
const connectDB = require("./db");
const userRouter = require("./Routes/user");
const ProductRouter = require("./Routes/Mobileproduct");
const cartRouter = require("./Routes/Cart");
const wishRouter = require("./Routes/Wishlist");
connectDB();


app.use("/user",userRouter)
app.use("/MobileProductRouter",ProductRouter)
app.use("/cartRouter",cartRouter)
app.use("/wishRouter",wishRouter)


app.listen(5500,()=>{
    console.log("Server is running on port 5500")
})


