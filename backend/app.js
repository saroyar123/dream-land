const express=require("express");
const cookieParser=require("cookie-parser");
const path =require("path");
if(process.env.NODE_ENV!=="production")
{
    require("dotenv").config({path:"backend/config/config.env"});
}

const app=express();
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));

// importing routes
const post=require("./routes/post");
const user=require("./routes/user");

app.use("/api/v1",post);  //using routes
app.use("/api/v1",user); 

app.use(express.static(path.join(__dirname,"../frontent/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontent/build/index.html"))
})


module.exports=app;