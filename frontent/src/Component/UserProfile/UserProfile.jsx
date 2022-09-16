import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { followAndUnfollowUser, getUserPosts, getUserProfile } from "../../Action/user";
import './UserProfile.css'
import { useAlert } from "react-alert"
import Loader from '../Ladder/Loader'
import Post from "../Post/Post";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import User from "../user/User";


const UserProfile = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();



  const { user, loading: userloading, error: userError } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user)
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const { error: followError, message, loading: followLoading } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler =async() => {
    setFollowing(!following)
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  }




  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    if (me._id === params.id) {
      setMyProfile(true);
    }



  }, [dispatch, me._id, params.id]);

  useEffect(() => {
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        }
        else {
          setMyProfile(false);
        }
      })
    }

  }, [me._id, user])



  useEffect(() => {
    console.log("likehooks call");
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" })
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" })
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" })
    }
  }, [dispatch, error, userError, followError, alert, message]);


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

              />
            ))
          ) : (
            <Typography variant="h6">User has not made any post</Typography>
          )}
      </div>
      <div className="accountright">
        {
          user && (
            <>
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
                <button onClick={() => setFollowingToggle(!followingToggle)}>Following</button>
              </div>
              <Typography>{user.following.length}</Typography>


              <div>
                <Typography>Post</Typography>
                <Typography>{user.posts.length}</Typography>
              </div>


              {
                myProfile ? null : (
                  <Button variant="contained"
                    onClick={followHandler}
                    style={{ background: following ? "red" : "blue" }}
                    disabled={followLoading}
                  >
                    {
                      following ? "Unfollow" : "Follow"
                    }
                  </Button>
                )
              }

            </>
          )
        }




        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Follow By</Typography>

            {
              user && user.followers.length > 0 ? user.followers.map((follow) => ((
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
              ) :
                <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>
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
              user && user.following.length > 0 ? user.following.map((follow) =>
              ((
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
              ) :
                <Typography style={{ margin: "2vmax" }}>You are not follow any one</Typography>
            }


          </div>

        </Dialog>


      </div>

    </div>
  )
}

export default UserProfile