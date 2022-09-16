const Post=require("../models/Post");
const User=require("../models/User");
const cloudinary=require("cloudinary");

exports.createPost=async(req,res)=>{
    try {

        const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts"
        })
        const newPostdata={
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            owner:req.user._id, 
        }

        const post=await Post.create(newPostdata);

        const user=await User.findById(req.user._id);

        user.posts.unshift(post._id);
        await user.save();

        res.status(200).json({
            success:true,
            message:"post created"
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }

};


// for delete post
exports.deletePost=async (req,res)=>{
    try {
        
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found",
            })
        }

        if(post.owner.toString()!==req.user._id.toString())
        {
            
            return res.status(404).json({
                success:false,
                message:"Unauthorized",
            })
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id);
        
        await post.remove();

        const user=await User.findById(req.user._id);
        const index= user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);

        await user.save();

        return  res.status(200).json({
            success:true,
            message:"Post deleted",
        });



    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// function for like and unlike posts

exports.likeAndUnlike=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

        if(!post)
        {
            return res.status(404).json({
                success:false,
                message:"post not found"
            })
        }

        if(post.likes.includes(req.user._id))
        {
            const index=post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();

           return  res.status(200).json({
                success:true,
                message:"Unliked post"
            });
            

        }

        post.likes.push(req.user._id);
        await post.save();

        return res.status(200).json({
            success:true,
            message:"liked post"
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
};

// post of all following by a user

exports.getPostOfFollowing=async(req,res)=>{
    
    try {

        const user=await User.findById(req.user._id);
        const posts=await Post.find({
            owner:{
                $in: user.following,
            }
        }).populate("owner likes comments.user")

        res.status(200).json({
            success:true,
            posts:posts.reverse(),
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

// update the post

exports.updateCaption=async (req,res)=>{
    try {
        const post=await Post.findById(req.params.id);

         
        if(!post)
        {
            return res.status(404).json({
                success:false,
                message:"post not found"
            })
        }

        if(post.owner.toString()!==req.user._id.toString())
        {
            return res.status(401).json({
                success:false,
                message:"unauthoized"
            })
        }

        const caption=req.body.caption;
        
        if(!caption)
        {
            return res.status(404).json({
                success:false,
                message:"caption not found"
            })
        }

        post.caption=caption;
        await post.save();

        res.status(200).json({
            success:true,
            message:"you successfully change the caption"
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

// add comment

exports.commentOnPost=async (req,res)=>{
    try {

        const post=await Post.findById(req.params.id);
        if(!post)
        {
           return  res.status(400).json({
                    success:false,
                    message:"post not found"
            });
        }

        let commentExists=-1;

        post.comments.forEach((item,index)=>{
            if(item.user.toString()==req.user._id.toString())
              commentExists=index;
        })

        if(commentExists!==-1)
        {
             
            post.comments[commentExists].comment=req.body.comment;

             await post.save();

            return res.status(200).json({
              success:true,
              message:"commet updated"
            })


        }
        else
        {
            post.comments.push({
                user:req.user._id,
                comment:req.body.comment
            });


        }

        await post.save();

        res.status(200).json({
            success:true,
            message:"commet added"
        })


        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// delete comment

exports.deleteComment=async (req,res)=>{
    try {

        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return  res.status(400).json({
                success:false,
                message:"post not found"
            });

        }

        if(post.owner.toString()===req.user._id.toString())
        {

            if(req.body.commentId==undefined)
            {
                return res.status(400).json({
                    success:false,
                    message:"comment id is required"
                })
            }
            
            post.comments.forEach((item,index)=>{
                if(item._id.toString()===req.body.commentId.toString())
                 post.comments.splice(index,1);
            });
            
            await  post.save();
            res.status(200).json({
              success:true,
              message:"your selected comment is deleted"
            });

        }
        else
        {
           post.comments.forEach((item,index)=>{
            if(item.user.toString()==req.user._id.toString())
             return post.comments.splice(index,1);

           });

          await  post.save();
          res.status(200).json({
            success:true,
            message:"your comment is deleted"
          })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }
}