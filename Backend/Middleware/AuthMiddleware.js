const jwt = require("jsonwebtoken");
require("dotenv").config()

 function Auth(req,res,next){
    const header = req.headers?.authorization
    try {
        const token = jwt.verify(header,process.env.SECRET)
      // console.log(token)
    if(token){
      req.userId= token
      next();
    }
    } catch (error) {
    return res.status(403).json({msg:"Cannot perform operation"})
        
    }
}
module.exports= Auth


// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// function Auth(req, res, next) {
//   const header = req.headers?.authorization;
  
//   console.log("Authorization Header:", header); // Debug line
  
//   if (!header || !header.startsWith("Bearer ")) {
//     return res.status(401).json({ msg: "Authorization token is missing or malformed" });
//   }

//   try {
//     const token = header.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return res.status(403).json({ msg: "Invalid or expired token" });
//   }
// }


// module.exports = Auth;

