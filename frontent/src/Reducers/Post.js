import {createReducer} from "@reduxjs/toolkit"
const initialState={};

export const likeReducer=createReducer(initialState,{
    LikeRequest:(state)=>{
        state.loading=true;
    },
    LikeSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    LikeFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    addCommentRequest:(state)=>{
        state.loading=true;
    },
    addCommentSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    addCommentFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    
    deleteCommentRequest:(state)=>{
        state.loading=true;
    },
    deleteCommentSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteCommentFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    // for create post

    NewPostRequest:(state)=>{
        state.loading=true;
    },
    NewPostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    NewPostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },


    // delete post
    DeletePostRequest:(state)=>{
        state.loading=true;
    },
    DeletePostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    DeletePostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    // for updatecaption

    UpdatePostRequest:(state)=>{
        state.loading=true;
    },
    UpdatePostSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdatePostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },


//    for update profile

    UpdateProfileRequest:(state)=>{
        state.loading=true;
    },
    UpdateProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdateProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    // update password

    UpdatePasswordRequest:(state)=>{
        state.loading=true;
    },
    UpdatePasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    UpdatePasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },


    // delete profile

    deleteProfileRequest:(state)=>{
        state.loading=true;
    },
    deleteProfileSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    deleteProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },


    // reducer for follow user

    userFollowRequest:(state)=>{
        state.loading=true;
    },
    userFollowSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    },
    userFollowFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    


    clearErrors:(state,action)=>{
        state.error=null;
    },
    clearMessages:(state,action)=>{
        state.message=null;
    }
});

// reducer of getmypost 

export const myPostsReducer=createReducer(initialState,{
    myPostRequest:(state)=>{
        state.loading=true;
    },
    myPostSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload; 
    },
    myPostFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload; 
    },
    clearErrors:(state)=>{
        state.error=null;
    }
});



// user post reducer


export const userPostsReducer=createReducer(initialState,{
    userPostsRequest:(state)=>{
        state.loading=true;
    },
    userPostsSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload; 
    },
    userPostsFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload; 
    },
    clearErrors:(state)=>{
        state.error=null;
    }
});