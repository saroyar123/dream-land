import axios from "axios";

export const likePost=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LikeRequest",
        })

        const {data}=await axios.get(`/api/v1/post/${id}`);
        dispatch({
            type:"LikeSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"LikeFailure",
            payload: error.response.data.message,
        })
    }
}



export const addCommentOnPost=(id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"addCommentRequest",
        })

        const {data}=await axios.put(`/api/v1/post/comment/${id}`,
        {comment},
        {
            headers:{"content-type":"application/json"}
        }
        );
        dispatch({
            type:"addCommentSuccess",
            payload:data.message,
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"addCommentFailure",
            payload: error.response.data.message,
        })
    }
}


// delete comment 

export const deleteCommentOnPost=(id,commentId)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:"deleteCommentRequest"
        })

        const {data}=await axios.delete(`/api/v1/post/comment/${id}`,{data:{commentId}});

        dispatch({
            type:"addCommentSuccess",
            payload:data.message,
        })
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"deleteCommentFailure",
            payload: error.response.data.message,
        })
    }
}



// for create post

export const createNewPost = (caption, image) => async (dispatch) => {
    try {
      dispatch({
        type: "NewPostRequest",
      });
  
      const { data } = await axios.post(
        `/api/v1/post/upload`,
        {
          caption,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "NewPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "NewPostFailure",
        payload: error.response.data.message,
      });
    }
  };


//   for deletepost

export const deletePost=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type: "DeletePostRequest",
          });
      
          const { data } = await axios.delete(`/api/v1/post/${id}`);
          dispatch({
            type: "DeletePostSuccess",
            payload: data.message,
          });

        } catch (error) {
        dispatch({
            type: "DeletePostFailure",
            payload: error.response.data.message,
          });
    }
}


// for update post


export const UpdatePost=(caption,id)=>async(dispatch)=>{
  try {
      dispatch({
          type: "UpdatePostRequest",
        });
    
        const { data } = await axios.put(`/api/v1/post/${id}`,
        {
          caption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch({
          type: "UpdatePostSuccess",
          payload: data.message,
        });

      } catch (error) {
      dispatch({
          type: "UpdatePostFailure",
          payload: error.response.data.message,
        });
  }
}



// update password


export const UpdatePassword=(oldPassword,newPassword)=>async(dispatch)=>{
  try {
      dispatch({
          type: "UpdatePasswordRequest",
        });
    
        const { data } = await axios.put(`/api/v1/update/password`,
        {
          oldPassword,newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch({
          type: "UpdatePasswordSuccess",
          payload: data.message,
        });

      } catch (error) {
      dispatch({
          type: "UpdatePasswordFailure",
          payload: error.response.data.message,
        });
  }
}

