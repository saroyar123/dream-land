import {  Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import './UpdatePassword.css'
import { UpdatePassword } from "../../Action/Post";
// import { loadUser } from "../../Action/user";
import Loader from "../Ladder/Loader";


const UpdatePasswordUser = () => {

    const {loading,error,message}=useSelector((state)=>state.like);
    
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");

    const dispatch = useDispatch();
    const alert=useAlert();

    const submitHandler=async(e)=>{
        e.preventDefault();
        dispatch(UpdatePassword(oldPassword,newPassword));
       
    }
    

   

    useEffect(()=>{
         
        if(error)
        {
         alert.error(error);
         dispatch({type:"clearErrors"})
        }

       

        if(message)
        {
         alert.success(message);
         dispatch({type:"clearMessages"})
        }

      },[dispatch,alert,message,error])

      

    return (
       loading?<Loader/>:(
        <div className="updatePassword">
        <form className="updatePasswordForm" onSubmit={submitHandler}>

            <Typography variant="h3" style={{ padding: "2vmax" }}>Dream Land</Typography>


            <input
                type="text"
                placeholder="oldPassword"
                className="updatePasswordInputs"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
                type="text"
                placeholder="newPassword"
                className="updatePasswordInputs"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            

            <Button disabled={loading} type="submit">Update</Button>

        </form>
    </div>
       )
    )
}



export default UpdatePasswordUser;