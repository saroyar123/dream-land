import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from './Component/header/header'
import Login from './Component/login/Login'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Action/user';
import Home from './Component/home/Home';
import Account from './Component/Account/Account';
import NewPost from './Component/NewPost/NewPost';
import Register from './Component/Register/Register';
import UpdateProfile from './Component/UpdateProfile/UpdateProfile';
import UpdatePasswordUser from './Component/Updatepassword/UpdatePassword';
import UserProfile from './Component/UserProfile/UserProfile';
import Search from './Component/Search/Search';
import NotFound from './Component/NotFound/NotFound';

function App() {

const dispatch=useDispatch();
  

  useEffect(()=>{                   

    // console.log("loadUser call");
    dispatch(loadUser());

  },[dispatch]);

  const {isAuthenticated}=useSelector((state)=>state.user);

  return (
    <Router>
     {
      isAuthenticated &&<Header/>
     }
     <Routes>
      <Route path="/" element={isAuthenticated?<Home/>:<Login/>}/>
      <Route path="/account" element={isAuthenticated?<Account/>:<Login/>}/>
      <Route path='/newpost' element={isAuthenticated?<NewPost/>:<Login/>}/>
      <Route path="/register" element={isAuthenticated?<Account/>:<Register/>}/>
      <Route path='/update/profile' element={isAuthenticated?<UpdateProfile/>:<Login/>}/>
      <Route path='/update/password' element={isAuthenticated?<UpdatePasswordUser/>:<Login/>}/>
      <Route path='/user/:id' element={isAuthenticated?<UserProfile/>:<Login/>}/>
      <Route path='/search' element={isAuthenticated?<Search/>:<Login/>} />
      <Route path='*' element={<NotFound/>}/>


     </Routes>
    </Router>
  );
}

export default App;
