const User=require("../models/User");
const jwt=require("jsonwebtoken");

exports.isAuthenticated=async(req,res,next)=>{

   try {
    
    const {token}=req.cookies;
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message:"login first",
        });
    }

    const decoded= jwt.verify(token,process.env.jwt_token);
    req.user=await User.findById(decoded._id);
    // console.log(req.user);

    next();
   } catch (error) {
    
    res.status(500).json({
        message:error.message, 

    })
   }
}