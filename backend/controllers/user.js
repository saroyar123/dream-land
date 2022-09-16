const Post = require("../models/Post");
const User = require("../models/User");
const { sendMail } = require("../middlewires/sendEmail");
const cloudinary = require("cloudinary");

exports.Register = async (req, res) => {                //for register
  try {
    const { name, email, password, avatar } = req.body;
    // console.log("register call")

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // console.log("register call")
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
  //  console.log(myCloud.public_id);
  //     console.log(myCloud.secure_url);


    user = await User.create({
      name,
      email,
      password,
      avatar: { 
        public_id: myCloud.public_id, 
        url: myCloud.secure_url,
      },
    });

    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        massage: "user does not exist",
      });
    }

    const isMatch = await user.matchpassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        massage: "password not match",
      });
    }

    const token = await user.generateToken();
    const option = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, option).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: error.massage,
    });
  }
};

// logout

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "your are logout",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: error.massage,
    });
  }
};

// for follower

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const userLogin = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }

    if (userLogin.following.includes(userToFollow._id)) {
      // if()

      const indexOfLoginUser = userToFollow.followers.indexOf(userLogin._id);
      const indexOfFollowUser = userLogin.following.indexOf(userToFollow._id);

      userToFollow.followers.splice(indexOfLoginUser, 1);
      // console.log(indexOfLoginUser);
      userLogin.following.splice(indexOfFollowUser, 1);
      // console.log(indexOfFollowUser);

      await userLogin.save();
      await userToFollow.save();

      return res.status(200).json({
        success: true,
        message: "unfollow user",
      });
    }

    userLogin.following.push(userToFollow._id);
    userToFollow.followers.push(userLogin._id);
    await userLogin.save();
    await userToFollow.save();

    return res.status(200).json({
      success: true,
      message: "user followed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
};

// update passwod

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { newPassword, oldPassword } = req.body;

    if (!newPassword || !oldPassword) {
      return res.status(400).json({
        success: false,
        message: "oldpassword and new password required",
      });
    }

    const isMatch = await user.matchpassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "old password not match",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "your password change successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massage: error.message,
    });
  }
};

// update profile////////

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email,avatar } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if(avatar)
    {
       await cloudinary.v2.uploader.destroy(user.avatar.public_id);

       const myCloud=await cloudinary.v2.uploader.upload(avatar,{
        folder:"avatars"
       })

       user.avatar.public_id=myCloud.public_id;
       user.avatar.url=myCloud.secure_url;
    }


    await user.save();

    res.status(200).json({
      success: true,
      message: "update your profile",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete profile

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const following = user.following;
    const followers = user.followers;
    const userId = req.user._id;

    // delete data of user from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);


    
    await user.remove();

    // logout at same time

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });


    // delete all post of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // removing user from  following followers

    for (let i = 0; i < following.length; i++) {
      const followingUser = await User.findById(following[i]);
      const index = followingUser.followers.indexOf(userId);
      followingUser.followers.splice(index, 1);
      await followingUser.save();
    }

    // removing user from followers

    for (let i = 0; i < followers.length; i++) {
      const followerUser = await User.findById(followers[i]);
      const index = followerUser.following.indexOf(userId);
      followerUser.following.splice(index, 1);
      await followerUser.save();
    }

    // removing all comment of user from the posts

    const allPosts=await Post.find();

    for(let i=0;i<allPosts.length;i++)
    {
      const post=await Post.findById(allPosts[i]._id);
      for(let j=0;i<post.comments.length;j++)
      {
          if(post.comments[j].user===userId)
          {
            post.comments.splice(j,1);
            
          }
          await post.save();
      }
    }

  // delete all like of the user from the posts

    for(let i=0;i<allPosts.length;i++)
    {
      const post=await Post.findById(allPosts[i]._id);
      for(let j=0;i<post.likes.length;j++)
      {
          if(post.likes[j]===userId)
          {
            post.comments.splice(j,1);
            
          }
          await post.save();
      }
    }


    res.status(200).json({
      success: true,
      message: "your profile is deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get my profile

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      message: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get any user profile

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      message: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all user

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({name: { $regex: req.query.name, $options: "i" },});

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forget password

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;

    const message = `reset your password by click on the link below: \n\n${resetUrl}`;

    try {
      await sendMail({
        email: user.email,
        subject: "reset password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      user.save();
      console.log("send mailer call");
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
