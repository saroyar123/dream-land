const express=require("express");
const { Register,login, followUser, logout, updatePassword, updateProfile, deleteProfile, myProfile, getUserProfile, getAllUser, forgetPassword, getMyPosts, getUserPosts } = require("../controllers/user");
const {isAuthenticated}=require("../middlewires/auth");

const router=express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated,followUser);
router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);
router.route("/delete/me").delete(isAuthenticated,deleteProfile);
router.route("/my/posts").get(isAuthenticated,getMyPosts);
router.route("/userposts/:id").get(isAuthenticated,getUserPosts);
router.route("/me").get(isAuthenticated,myProfile);
router.route("/user/:id").get(isAuthenticated,getUserProfile);
router.route("/user").get(isAuthenticated,getAllUser);
router.route("/forgot/password").post(isAuthenticated,forgetPassword);

module.exports=router;