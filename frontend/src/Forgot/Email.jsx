import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom' 
import axios from "axios";



export default function Email(otp) {
    const[email,setEmail]=useState('');
    const[errors,setErrors]=useState({})
    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const otpnum = Math.floor(1000 +Math.random()*9000)
//   console.log(otpnum)
        let errors={}

        if (!email) {
            errors.email = "Email is required";
            
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
            
        }
        setErrors(errors);
        if(Object.keys(errors).length === 0){
            try {
                const response = await axios.post(import.meta.env.VITE_API_FORGOT_EMAIL,{
                    email,
                    OTP:otpnum
                })
                console.log(response.data)
                localStorage.setItem("email",response.data)
                navigate("/otp",{state:{num:{otpnum}}})
                
            } catch (error) {
                console.log("Errors",error)
                alert("user not found")
                
            }
        }
    }
  return (
    <>
    <div className='formcenter'>
        <form onSubmit={handleSubmit} className='form'>
        <h1 className="h">Enter your Email</h1>
            <label className='formname'><h4>Email</h4>
            <input type='text'  className="forminput" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} ></input></label>
            {errors.email && <span className="error">{errors.email}</span>}
        <   button type='submit' className='formbutton'>Next</button>
        </form>
    </div>
    </>
  )
}
