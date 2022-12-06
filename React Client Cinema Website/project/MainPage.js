import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import LoginPageComp from './LoginPage';
import CreateAccountComp from './CreateAccount';
import MoviesPageComp from './Movies/MoviesPage';
import EditUserPageComp from './Users/EditUserPage';
import EditMoviePageComp from './Movies/EditMoviePage';
import SubscriptionsPageComp from './Members/MembersPage';
import EditMemberPageComp from './Members/EditMemberPage';
import UsersPageComp from './Users/UsersPage';
import MembersPageComp from './Members/MembersPage';
import MenuPageComp from './MenuPage';
import { fetchUsers, revertUsers } from './Reducers/UserSlice';
import { fetchMovies, fetchMoviesNames, revertMovies } from './Reducers/MovieSlice';
import { fetchPartialSubscriptions, fetchSubscriptions, revertSubscriptions } from './Reducers/SubscriptionSlice';
import { fetchMembers, revertMembers } from './Reducers/MemberSlice';



// This is the main component from which all the routes are configured

function MainPageComp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Fetch data from server through thunk middleware according to user's permissions
  const fetchAccordingToPermissions = async () => {
  
    let permissions = sessionStorage.getItem('permissions');
    if (permissions.includes("View Members")) {
      await dispatch(fetchMembers()).unwrap();
      await dispatch(fetchSubscriptions()).unwrap();
      if (!permissions.includes("View Movies")) {
        await dispatch(fetchMoviesNames()).unwrap();
      };
    };
    if (permissions.includes("View Movies")) {
      await dispatch(fetchMovies()).unwrap();
      if (!permissions.includes("View Members") && permissions.includes("Delete Movies")) {
        await dispatch(fetchPartialSubscriptions()).unwrap();
      };
    };
    let user = sessionStorage.getItem('username');
    if (user === "admin") {
      await dispatch(fetchUsers()).unwrap();
    };
  };


  // Login/Create function shared with LoginPage and CreatePage
  // After successfully logging in or creating an account, set [username, permissions, token] in storage and fetch data accordingly
  // Finally move to menu
  // Alert server response if action has failed
  const loginOrCreate = async (action, creds) => {
  
    try {
      let resp = await axios.post("http://localhost:5001/auth/" + action + "/", creds);
      sessionStorage.setItem('username', resp.data.username);
      sessionStorage.setItem('permissions', resp.data.permissions);
      sessionStorage.setItem('token', resp.data.token);
      fetchAccordingToPermissions();
      alert(action==="login" ? "Logged-in Successfully" : "Account Created Successfully");
      navigate('/menu');
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error);
        console.log(err.response.status);
        console.log(err.message);
        console.log(err.response.headers);
        console.log(err.response.data);
      };
    };
  };


  // Remove all user's parameters and all data from redux states
  const logout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('token');
    dispatch(revertUsers());
    dispatch(revertMembers());
    dispatch(revertMovies());
    dispatch(revertSubscriptions());
    navigate('/login');
  };


  // If any of [username, permissions, token] parameters is missing, trigger logout
  // Otherwise, fetch data according to permissions
  useEffect(() => {
    let username = sessionStorage.getItem('username');
    let permissions = sessionStorage.getItem('permissions');
    let token = sessionStorage.getItem('token');
    if (!username || !permissions || !token) {
      logout();
    } else {
      fetchAccordingToPermissions();
    };
  }, []);


  return (
    <div className="App" style={ {width: "600px"} }>
      <h1>Movies Subscriptions Site</h1>
        <Routes>
            <Route path="/login" element={ <LoginPageComp loginFunc={(a, c) => loginOrCreate(a, c)} /> } />  
            <Route path="/create" element={ <CreateAccountComp createFunc={(a, c) => loginOrCreate(a, c)} /> } />  
            <Route path="/menu" element={ <MenuPageComp /> } />  
            <Route path="/movies" element={ <MoviesPageComp /> } />  
            <Route path="/members" element={ <MembersPageComp /> } />  
            <Route path="/users" element={ <UsersPageComp /> } />  
            <Route path="/user/edit/:id" element={ <EditUserPageComp /> } />  
            <Route path="/movie/edit/:id" element={ <EditMoviePageComp /> } />  
            <Route path="/member/edit/:id" element={ <EditMemberPageComp /> } />  
            <Route path="/movie/:id" element={ <MoviesPageComp /> } />  
            <Route path="/member/:id" element={ <SubscriptionsPageComp /> } />  
        </Routes>
    </div>
  );
};

export default MainPageComp;

