const express = require("express");
const cors= require("cors")
const zod = require("zod");
const bcrypt = require("bcryptjs")
const  jwt = require("jsonwebtoken");
// const { User } = require("../db");
const { User } = require("../Modal/userModal");



const app =express();
app.use(cors());
app.use(express.json())
require("dotenv").config()
const userRouter = express.Router()


const signupValidator = zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(5)
})

userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    console.log("body", body);
    const success = signupValidator.safeParse(body);
    if (!success) {
      return res.status(403).json({ msg: "Invalid inputs" });
    }
  
    try {
      const check = await User.findOne({
        email: body.email,
      });
      if (check) {
        return res.status(403).json({ msg: "Email already exists" });
      }
  
      const response = await User.create({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
      });
      console.log(response);
  
      // Generate JWT token including the userId
      const token = jwt.sign(
        { userId: response._id.toHexString() }, // Include the userId in the token payload
        process.env.SECRET,
        { expiresIn: "1h" } // Optional: Set an expiration for the token
      );
  
      return res.json({
        username: response.username,
        token: token,
        userId: response._id.toHexString(), // Optionally return userId in the response
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(404).json({ msg: "Signup error" });
    }
  });

//login

const loginValidator= zod.object({
    email:zod.string().email(),
    password:zod.string().min(5)
})
userRouter.post("/login", async (req, res) => {
    const body = req.body;
    const success = loginValidator.safeParse(body);
    if (!success) {
      return res.status(403).json({ msg: "Invalid inputs" });
    }
  
    try {
      const emailCheck = await User.findOne({
        email: body.email,
      });
      if (!emailCheck) {
        return res.status(403).json({ msg: "Email does not exist" });
      }
  
      const passwordMatch = await bcrypt.compare(
        body.password,
        emailCheck.password
      );
  
      if (!passwordMatch) {
        return res.status(403).json({ msg: "Incorrect password" });
      }
  
      // Generate JWT token including the userId
      const token = jwt.sign(
        { userId: emailCheck._id.toHexString() }, // Include userId in token payload
        process.env.SECRET,
        { expiresIn: "1h" } // Optional: Set an expiration for the token
      );
  
      return res.json({
        username: emailCheck.username,
        token: token,
        userId: emailCheck._id.toHexString(), // Optionally return userId in the response
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(404).json({ msg: "Login error" });
    }
  });
  

module.exports= userRouter;