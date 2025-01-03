const express = require("express");
const cors= require("cors")
const zod = require("zod");
const bcrypt = require("bcryptjs")
const  jwt = require("jsonwebtoken");
// const { User } = require("../db");
const { User } = require("../Modal/userModal");
const SendEmail = require("../nodemailer");



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

userRouter.post("/signup",async(req,res)=>{
    const body = req.body
    console.log("body", body)
    const success = signupValidator.safeParse(body)
    if(!success){
        return res.status(403).json({msg:"invalid inputs"})
    }

    try {
        const Check = await User.findOne({
        email:body.email
        })
        if(Check){
        return res.status(403).json({msg:'email already exist'})
        }

        const response = await User.create({
            username:body.username,
            email:body.email,
            password:bcrypt.hashSync(body.password,10),
            // isadmin:false
        })
        console.log(response)
     const token = jwt.sign(response._id.toHexString(),process.env.SECRET)
     return res.json({
        name :response.username,
        token:token,
        userId:response._id.toHexString()
     })
    } catch (error) {
        console.error('Signup error:', error); 
        return res.status(404).json({msg:"signup error"})
    }
})

//login

const loginValidator= zod.object({
    email:zod.string().email(),
    password:zod.string().min(5)
})
userRouter.post("/login",async(req,res)=>{
    const body = req.body
    const success = loginValidator.safeParse(body)
    if(!success){
        return res.status(403).json({msg:"invalid inputs"})
    }

    try {
        const emailCheck = await User.findOne({
        email:body.email
        })
        if(!emailCheck){
        return res.status(403).json({msg:'email does not exist'})
        }
        

        const passwordMatch = await bcrypt.compare(body.password, emailCheck.password);
        
        if (!passwordMatch) {
            return res.status(403).json({ msg: "Incorrect password" });
        }
     const token = jwt.sign(emailCheck._id.toHexString(),process.env.SECRET)
     return res.json({
        name:emailCheck.username,
        token:token,
        userId:emailCheck._id.toHexString()
        
     })
    } catch (error) {
        return res.status(404).json({msg:"login error"})
    }
})


userRouter.post("/emailotp",async(req,res)=>{
    const body = req.body
    try {
        const check = await User.findOne({
            email:body.email
        })
        if(!check){
            return res.status(404).json({msg:"email does not exist"})
        }
        else{
             SendEmail(body)
            .then((response)=>{return res.send(check.email)})
            .catch((response)=>{return res.send(response.msg)})
        }
        return res.json({msg:"otp send"})
    } catch (error) {
        return res.status(404).json({msg:" otp error"})
        
    }
})

//UPDATE

userRouter.put('/update',async(req,res)=>{
    const body = req.body
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password,salt)
    
    try {
    
    const response = await User.updateOne({email:body.email},{password:securePass})
    return res.json({msg:"password updated"})
    } 
    catch (error) {
        return res.status(500).json({ msg:'error' });
        
    }
})

module.exports= userRouter;