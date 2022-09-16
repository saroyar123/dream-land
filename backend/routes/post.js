const express=require("express");
const { createPost, likeAndUnlike, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment } = require("../controllers/post");
const { isAuthenticated } = require("../middlewires/auth");

const router=express.Router();
router.route("/post/upload").post(isAuthenticated ,createPost);

router.route("/post/:id")
.get(isAuthenticated,likeAndUnlike)
.delete(isAuthenticated,deletePost)
.put(isAuthenticated,updateCaption);

router.route("/post").get(isAuthenticated,getPostOfFollowing);
router.route("/post/comment/:id").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment);



module.exports=router;