import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Action/Post";
import { getFollowingPost, getMyPosts } from "../../Action/user";
const CommentCard = (
    {
        userId,
        name,
        avater,
        comment,
        commentId,
        postId,
        isAccount
    }
) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const deleteCommentHandler = () => {
        console.log("delete comment")
        dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount) {
            dispatch(getMyPosts());
        }
        else {
            dispatch(getFollowingPost());
        }
    }
    return (
        <div className="commentUser">
            <Link to={`/user/${userId}`}>
                <img src={avater} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>
            <Typography>{comment}</Typography>

            {
                isAccount ? (<Button onClick={deleteCommentHandler}>
                    <Delete />
                </Button>) : userId === user._id ? (<Button onClick={deleteCommentHandler}>
                    <Delete />
                </Button>) : null
            }
        </div>
    )
}

export default CommentCard;