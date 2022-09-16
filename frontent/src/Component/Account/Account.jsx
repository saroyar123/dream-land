import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DeleteMyProfile, getMyPosts, logOutUser } from "../../Action/user";
import './Account.css'
import {useAlert} from "react-alert"
import Loader from '../Ladder/Loader'
import Post from "../Post/Post";
import { Avatar, Button, Typography,Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import User from "../user/User";
const Account = () => {

  const dispatch = useDispatch();
  const alert=useAlert();

  

  const { user, loading: userloading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { error: likeError, message,loading:deleteLoading } = useSelector((state) => state.like);

  const [followersToggle,setFollowersToggle]=useState(false);
  const [followingToggle,setFollowingToggle]=useState(false);

  const  logoutHandeler=()=>{
    dispatch(logOutUser());
    alert.success("loguot sucessfully");
  };

  const deleteProfileHandler=async()=>{
    await dispatch(DeleteMyProfile());
    dispatch(logOutUser());
  }

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log("likehooks call");
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" })
    }

   

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" })
    }
  }, [dispatch, error, likeError,alert, message]);


  return loading === true || userloading === true ? <Loader /> : (
    <div className="account">
      <div className="accountleft">
        {
          posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                isAccount={true}
                isDelete={true}
              />
            ))
          ) : (
            <Typography variant="h6">You have not made any post</Typography>
          )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />
        <Typography variant="h5">{user.name}</Typography>

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>Followers</button>
        </div>
        <Typography>{user.followers.length}</Typography>

        <div>
          <button  onClick={() => setFollowingToggle(!followingToggle)}>Following</button>
        </div>
        <Typography>{user.following.length}</Typography>


        <div>
          <Typography>Post</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>


        <Button variant="contained"  onClick={logoutHandeler}>LogOut</Button>


        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
          >
          Delete My Prifile</Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Follow By</Typography>

            {
            user &&user.followers.length>0?user.followers.map((follow)=>((
              <User
              key={follow._id}
              userId={follow._id}
              name={follow.name}
              avatar={follow.avatar.url}
            />
            ))
            ):
            <Typography  style={{margin:"2vmax"}}>You have no followers</Typography>
            }
            

          </div>

        </Dialog>



        {/* dialog box for following */}

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {
            user &&user.following.length>0?user.following.map((follow)=>
              ((
              <User
              key={follow._id}
              userId={follow._id}
              name={follow.name}
              avatar={follow.avatar.url}
            />
            ))
            ):
            <Typography style={{margin:"2vmax"}}>You are not follow any one</Typography>
            }
            

          </div>

        </Dialog>


      </div>

    </div>
  )
}

export default Account