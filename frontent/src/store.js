import {configureStore} from "@reduxjs/toolkit"
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import{
  getAllUserReducers, 
  postOfFollowingReducers, 
  UserProfileReducers, 
  userReducer} 
  from "./Reducers/user"

const store=configureStore({
    reducer:{
      user:userReducer,
      postOfFollowing:postOfFollowingReducers,
      getAllUser:getAllUserReducers,
      like:likeReducer,
      myPosts:myPostsReducer,
      userProfile:UserProfileReducers,
      userPosts:userPostsReducer

    },
})

export default store;