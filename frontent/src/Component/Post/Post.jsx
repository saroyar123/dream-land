import React, { useEffect } from "react";
import User from "../user/User";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addCommentOnPost, deletePost, likePost, UpdatePost } from "../../Action/Post";
import { getFollowingPost, getMyPosts, loadUser } from "../../Action/user";
import CommentCard from "../CommentCard/CommentCard";
// import { useAlert } from "react-alert";


const Post = (
  {
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
  }
) => {

  const [liked, setlike] = useState(false);
  const [likesUser, setLikeUser] = useState(false);
  const [commentToggle,setcommentToggle]=useState(false);
  const [commentValue,setcommentValue]=useState("");

// for post caption update
  const [captionToggle,setcaptionToggle]=useState(false);
  const [captionValue,setcaptionValue]=useState(caption);

  const dispatch = useDispatch();
  // const alert=useAlert();
  const handelLiked = async () => {
    setlike(!liked);
    await dispatch(likePost(postId));

    if(isAccount)
    {
      dispatch(getMyPosts());
    }
    else{
      dispatch(getFollowingPost());
    }
    
  }

  const { user } = useSelector((state) => state.user);
  
  const addCommentHandler=async(e)=>{
    e.preventDefault();
    await dispatch(addCommentOnPost(postId,commentValue));

    if(isAccount)
    {
      dispatch(getMyPosts());
    }
    else{
      dispatch(getFollowingPost());
    }
  }

  // for update post

  const updatePostHandler=(e)=>{
    e.preventDefault();
    dispatch(UpdatePost(captionValue,postId));
    dispatch(getMyPosts());

  }

  // for delete post
   const deleteHandelar=async()=>{
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
        // alert.success("post delete");
  
   }




  useEffect(() => {

    likes.forEach((item) => {
      if (item._id === user._id) {
        setlike(true);
      }
    })
  }, [likes, user._id]);


  return (
    <div className="post">
      <div className="postHeader">
                                        
        {isAccount ? <Button  onClick={()=>setcaptionToggle(!captionToggle)}>       {/* for update psot */}     
          <MoreVert />
        </Button> : null}
      </div>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vamx 2vmax",

        }}

        onClick={() => setLikeUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} like</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handelLiked}>
          {
            liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />
          }
        </Button>

        <Button
        onClick={()=>setcommentToggle(!commentToggle)}
        >
          <ChatBubbleOutline />
          
        </Button>

        {
          isDelete ? (<Button onClick={deleteHandelar}>
            <DeleteOutline />
          </Button>) : null
        }
      </div>
      <Dialog
        open={likesUser}
        onClose={() => setLikeUser(!likesUser)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Like By</Typography>
          {
            likes.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />

            ))
          }

        </div>

      </Dialog>


      {/* comment on the post */}

      <Dialog
        open={commentToggle}
        onClose={() => setcommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comment By</Typography>

           <form className="commentForm" onSubmit={addCommentHandler}>
            <input
            type="text"
            value={commentValue}
            onChange={(e)=>setcommentValue(e.target.value)}
            placeholder="comment here .."
            required
            />
            <Button type="submit" variant="contained"
            >Add</Button>
           </form>

          {
            comments.length>0?comments.map((item)=>(
              <CommentCard 
              key={item._id}
              userId={item.user._id}
              name={item.user.name}
              avater={item.user.avatar.url}
              comment={item.comment}
              commentId={item._id}
              postId={postId}
              isAccount={isAccount}
              />
            )):<Typography>No comment Yet</Typography>
          }

        </div>

      </Dialog>


      {/* for update caption */}
      
      <Dialog
        open={captionToggle}
        onClose={() =>setcaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography>Update Caption</Typography>
        <form className="commentForm" onSubmit={updatePostHandler}>
            <input
            type="text"
            value={captionValue}
            onChange={(e)=>setcaptionValue(e.target.value)}
            placeholder="caption here..."
            required
            />
            <Button type="submit" variant="contained">Update</Button>
           </form>

        </div>

      </Dialog>



    </div>


  )
}

export default Post;