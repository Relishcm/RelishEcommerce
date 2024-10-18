const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json())
const connectDB = require("./db");
const userRouter = require("./Routes/user");
const ProductRouter = require("./Routes/product");
connectDB();


app.use("/user",userRouter)
app.use("/ProductRouter",ProductRouter)


app.listen(5500,()=>{
    console.log("Server is running on port 5500")
})


