import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Action/user";
import { useAlert } from "react-alert";
import './Register.css'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
 
    const dispatch = useDispatch();
    const alert=useAlert();
    const{loading,error}=useSelector((state)=>state.user);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(registerUser(name, email, password,avatar));

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setAvatar(Reader.result);
          }
        };
      };

      
      useEffect(()=>{
         
        if(error)
        {
         alert.error(error);
         dispatch({type:"clearErrors"})
        }

      },[dispatch,alert,error])

      

    return (
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>

                <Typography variant="h3" style={{ padding: "2vmax" }}>Dream Land</Typography>

                <Avatar
                    src={avatar}
                    alt="User"
                    sx={{ height: "10vmax", width: "10vmax" }}
                />

                <input type="file" accept="image/*" onChange={handleImageChange} />

                <input
                    type="text"
                    placeholder="Name"
                    className="registerInputs"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="registerInputs"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="registerInputs"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link to="/">
                    <Typography>already signed in?Login Now</Typography>
                </Link>

                <Button disabled={loading} type="submit">Sign up</Button>

            </form>
        </div>
    )
}

export default Register;