import axios from "axios";

export const loginUser=(email,password)=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"loginRequest"
        })

        const {data}=await axios.post("/api/v1/login",{email,password},{             
            headers:{
                "Content-type":"application/json"
            }
        })

        dispatch({                         //redux dispatch function   
            type:"loginSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"loginFailure",
            payload: error.response.data.message,
        })
        
    }
}


// loaduser 

export const loadUser=()=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"LoadUserRequest"
        })

        const {data}=await axios.get("/api/v1/me");

        dispatch({                         //redux dispatch function   
            type:"LoadUserSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"LoadUserFailure",
            payload: error.response.data.message,
        })
        
    }
}


// post of the  user which i follow

export const getFollowingPost=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"postOfFollowingRequest",
        })

        const {data}=await axios.get("/api/v1/post");
        dispatch({
            type:"postOfFollowingSuccess",
            payload:data.posts,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"postOfFollowingFailure",
            payload: error.response.data.message,
        })
    }
}


// action for get all user


export const getAllUser=(name="")=>async(dispatch)=>{
    try {
        dispatch({
            type:"getAllUserRequest",
        })

        const {data}=await axios.get(`/api/v1/user?name=${name}`);
        dispatch({
            type:"getAllUserSuccess",
            payload:data.user,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"getAllUserFailure",
            payload: error.response.data.message,
        })
    }
}

// action of my post

export const getMyPosts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"myPostRequest",
        })

        const {data}=await axios.get("/api/v1/my/posts");
        dispatch({
            type:"myPostSuccess",
            payload:data.posts,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"myPostFailure",
            payload: error.response.data.message,
        })
    }
}



// logout Action


export const logOutUser=()=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"LogOutUserRequest"
        })

        await axios.get("/api/v1/logout");

        dispatch({                         //redux dispatch function   
            type:"LogOutUserSuccess",
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"LogOutUserFailure",
            payload: error.response.data.message,
        })
        
    }
}


// for register


export const registerUser=(name,email,password,avatar)=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"RegisterRequest"
        })

        const {data}=await axios.post("/api/v1/register",{name,email,password,avatar},{             
            headers:{
                "Content-type":"application/json"
            }
        });

        dispatch({                         //redux dispatch function   
            type:"RegisterSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"RegisterFailure",
            payload: error.response.data.message,
        })
        
    }
};


// update profile of user

export const UpdateProfileUser=(name,email,avatar)=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"UpdateProfileRequest"
        })

        const {data}=await axios.put("/api/v1/update/profile",{name,email,avatar},{             
            headers:{
                "Content-type":"application/json"
            }
        });

        dispatch({                         //redux dispatch function   
            type:"UpdateProfileSuccess",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"UpdateProfileFailure",
            payload: error.response.data.message,
        })
        
    }
};


// delete my profile


export const DeleteMyProfile=(name,email,avatar)=>async(dispatch)=>{
    
    try {

        dispatch({                       //redux dispatch function   
            type:"deleteProfileRequest"
        })

        const {data}=await axios.delete("/api/v1/delete/me")

        dispatch({                         //redux dispatch function   
            type:"deleteProfileSuccess",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"deleteProfileFailure",
            payload: error.response.data.message,
        })
        
    }
};


// action for get user post

export const getUserPosts=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"userPostsRequest",
        })

        const {data}=await axios.get(`/api/v1/userposts/${id}`);
        dispatch({
            type:"userPostsSuccess",
            payload:data.posts,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"userPostsFailure",
            payload: error.response.data.message,
        })
    }
}

// get user profile 
export const getUserProfile=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"userProfileRequest",
        })

        const {data}=await axios.get(`/api/v1/user/${id}`);
        dispatch({
            type:"userProfileSuccess",
            payload:data.user,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"userProfileFailure",
            payload: error.response.data.message,
        })
    }
}


// action to follow user

export const followAndUnfollowUser=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"userFollowRequest",
        })

        const {data}=await axios.get(`/api/v1/follow/${id}`);
        dispatch({
            type:"userFollowSuccess",
            payload:data.message,
        });

    } catch (error) {
        dispatch({                            //redux dispatch function   
            type:"userFollowFailure",
            payload: error.response.data.message,
        })
    }
}









