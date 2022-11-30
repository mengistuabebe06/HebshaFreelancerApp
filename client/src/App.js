import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route , useRoutes} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Landing from './components/pages/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Slider from './components/shared/Slider';
import Job from './components/pages/Job';
import JobList from './components/pages/JobList';
import About from './components/pages/About';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './action/authAction';
import jwtDecode from 'jwt-decode';


//check for token and to take the session
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken)
  //Decode token and get user data and expolaration
  const decoded = jwtDecode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser())
    // TODO: crear current profile
    // redirect to login
    window.location.href('/login')
  }
}

const AllRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/job", element: <Job /> },
    { path: "/job/joblist", element: <JobList /> },
    { path: "/about", element: <About /> },
  ]);
  return routes;
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar/>
      
          <AllRoutes/>
          <Footer/>
        </Router>
    </Provider>

    )
  }
}


// const App = () => {
//   return (
//     <Router>
//       <Navbar/>
//         <Head/>
//       <Footer/>
//     </Router>
//   );
// };


export default App;




