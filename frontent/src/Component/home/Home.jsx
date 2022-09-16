import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../user/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getFollowingPost } from "../../Action/user";
import Loader from "../Ladder/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {

    const alert=useAlert();
    const dispatch = useDispatch();
    

    const { loading, posts, error } = useSelector(
        (state) => state.postOfFollowing
    )
    const {error:likeError,message}=useSelector((state)=>state.like);

    const {loading:userloading,users}=useSelector(
        (state)=>state.getAllUser
    )

    useEffect(() => {

        dispatch(getFollowingPost());
        dispatch(getAllUser());

    }, [dispatch]);

    useEffect(()=>{
        console.log("likehooks call");
       if(error)
       {
        alert.error(error);
        dispatch({type:"clearErrors"})
       }

       if(likeError)
       {
        alert.error(likeError);
        dispatch({type:"clearErrors"})
       }

       if(message)
       {
        alert.success(message);
        dispatch({type:"clearMessages"})
       }
    },[dispatch,error,likeError,alert,message]);

    return (
        loading===true||userloading===true ? <Loader /> : (
            <div className="home">
                <div className="homeleft">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            likes = {post.likes}
                            comments ={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}

                            />
                        ))
                    ) : (<Typography variant="6">no post yet</Typography>)
                    }

                </div>
                <div className="homeright">
                    {
                        users && users.length>0?(
                            users.map((user)=>(
                            <User 
                            key={user._id}
                            userId={user._id} 
                            name={user.name} 
                            avatar={user.avatar.url} 
                            />
                            ))
                        ):(<Typography>no user yet</Typography>)
                    }

                </div>
            </div>)
    )
}

export default Home