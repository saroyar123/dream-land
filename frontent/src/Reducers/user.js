import {createReducer} from "@reduxjs/toolkit"
const initialState={
    isAuthenticated:false
};

export const userReducer=createReducer(initialState,{
    loginRequest:(state)=>{
        state.loading=true;
    },
    loginSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    loginFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;

    },

    RegisterRequest:(state,action)=>{
        state.loading=true;
    },
    RegisterSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    RegisterFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },


    LoadUserRequest:(state)=>{
        state.loading=true;
    },
    LoadUserSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    LoadUserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=false;
    },


    // logout reducer

    LogOutUserRequest:(state)=>{
        state.loading=true;
    },
    LogOutUserSuccess:(state,action)=>{
        state.loading=false;
        state.user=null;
        state.isAuthenticated=false;
    },
    LogOutUserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.isAuthenticated=true;
    },

    clearErrors:(state)=>{
        state.error=null;
    }


});


 export const postOfFollowingReducers=createReducer({},{
    postOfFollowingRequest:(state)=>{
        state.loading=true;
    },
    postOfFollowingSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload;

    },
    postOfFollowingFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    }
})


// get all user

export const getAllUserReducers=createReducer({},{
    getAllUserRequest:(state)=>{
        state.loading=true;
    },
    getAllUserSuccess:(state,action)=>{
        state.loading=false;
        state.users=action.payload;

    },
    getAllUserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    }
})


// get user profile reducer

export const UserProfileReducers=createReducer({},{
    userProfileRequest:(state)=>{
        state.loading=true;
    },
    userProfileSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;

    },
    userProfileFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearErrors:(state)=>{
        state.error=null;
    }
})