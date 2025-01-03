const nodemailer = require("nodemailer");
require("dotenv").config();


function SendEmail({email,OTP}){
    // console.log(email)
    return new Promise((reslove,reject)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    var mail_configs={
        from:process.env.EMAIL,
        to:email,
        subject:"OTP for reset Password",
        html:`<h1>Hello sir,${email}</h1>
        <h3>Your new OTP ${OTP}</h3>`
        
    }
    transporter.sendMail(mail_configs,function(error,info){
        if(error){
            return reject({msg:"OTP error"})
        }
        else{
         return   reslove({msg:"OTP send"})
        }

    })
}
    )}

module.exports= SendEmail