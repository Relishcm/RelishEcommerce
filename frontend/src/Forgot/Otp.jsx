import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Otp() {
    const[otp,setOtp]= useState(['','','',''])
    const[errors,setErrors]=useState({})
    const navigate = useNavigate()
    const location = useLocation();
    const num = location.state?.num;

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const string = num?.otpnum.toString();
        const enterotp=otp?.join("")
        let errors={};
        if(!top){
            errors.top="Please enter your otp"
        }
        setErrors(errors);
        if(Object.keys(errors).length===0){
            try {
              if(enterotp===string){
                navigate("/reset")
              }
               else{
                alert("otp not verified")
               }
                
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
        <h1 className='hotp'>Enter Your Otp</h1>
       {
        otp.map((key,index)=>(
            <input value={key} type='text' className='formotp' maxLength={1} onChange={(e)=>{
                let newotp = [...otp]
                newotp[index]= e.target.value;
                setOtp(newotp)
            }} />
        ))
       }

       <button className='formbutton'>Next</button>
    </form>
  </div>
  </>
  )
}
