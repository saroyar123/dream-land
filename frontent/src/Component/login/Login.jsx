import React, { useEffect } from "react";
import './login.css';
import{Typography,Button} from '@mui/material';
import{ Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Action/user";
import { useAlert } from "react-alert";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const alert=useAlert();
    const {error}=useSelector((state)=>state.user);

    const loginHandeler=(e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password));
    }

   
    useEffect(() => {
      console.log("likehooks call");
      if (error) {
        alert.error(error);
        dispatch({ type: "clearErrors" })
      }
  
     
    }, [dispatch,alert ,error]);
  

    return(
        <div className="login">
            <form className="loginForm" onSubmit={loginHandeler}>
                <Typography variant="h3" style={{padding:"2vmax"}}>Dream Land</Typography>

              <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />

              <input 
              type="password" 
              placeholder="Password" 
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />

              <Link to={"/forget-password"}>
                <Typography>forgot password?</Typography>
              </Link>

              <Button type="submit">Login</Button>

              <Link to="/register">
                <Typography>new register </Typography>
              </Link>
            </form>

        </div>
    )
};

export default Login;