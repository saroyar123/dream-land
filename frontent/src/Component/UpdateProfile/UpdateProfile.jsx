import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import {  loadUser, UpdateProfileUser } from "../../Action/user";
import { useAlert } from "react-alert";
import './UpdateProfile.css'
import Loader from "../Ladder/Loader";

const UpdateProfile = () => {
    const {loading,error,user}=useSelector((state)=>state.user);
    const {loading:updateLoading,error:updateError,message}=useSelector((state)=>state.like);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatarPrv,setAvatarPrv]=useState(user.avatar.url);
    const [avatar, setAvatar] = useState(avatarPrv);


    const dispatch = useDispatch();
    const alert=useAlert();
    

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(UpdateProfileUser(name, email,avatar));
        dispatch(loadUser());

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
    
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            setAvatarPrv(Reader.result);

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

        if(updateError)
        {
         alert.error(updateError);
         dispatch({type:"clearErrors"})
        }

        if(message)
        {
         alert.success(message);
         dispatch({type:"clearMessages"})
        }

      },[dispatch,updateError,alert,message,error])

      

    return (
       loading?<Loader/>:(
        <div className="updateProfile">
        <form className="updateProfileForm" onSubmit={submitHandler}>

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
                className="updateProfileInputs"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                className="updateProfileInputs"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            

            <Button disabled={updateLoading} type="submit">Update</Button>

        </form>
    </div>
       )
    )
}



export default UpdateProfile;