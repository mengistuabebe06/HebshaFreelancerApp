import React, { Fragment,Component } from 'react'
import { BrowserRouter as Router, Routes, Route , useRoutes, Switch} from "react-router-dom";
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
import Profiles from './components/pages/Profiles';
import PrivateRoute from './components/shared/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperinace from './components/add-credential/AddExperinace';
import AddEducation from './components/add-credential/AddEducation';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './action/authAction';
import jwtDecode from 'jwt-decode';
import { CLEAR_CURRENT_PROFILE } from './action/type';



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
    store.dispatch(CLEAR_CURRENT_PROFILE())
    // redirect to login
    window.location.href('/login')
  }
}

// const AllRoutes = () => {
//   let routes = useRoutes([
//     { path: "/", element: <Landing /> },
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },
//     { path: "/job", element: <Job /> },
//     { path: "/job/joblist", element: <JobList /> },
//     { path: "/about", element: <About /> },
//     { path: "/profiles", element: <Profiles /> },
//   ]);
//   return routes;
// };

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element= {<Landing/>}/>
            <Route path='/login' element= {<Login/>}/>
            <Route path='/register' element= {<Register/>}/>
            <Route path='/job' element= {<Job/>}/>
            <Route path='/job/joblist' element= {<JobList/>}/>
            <Route path='/about' element= {<About/>}/>
            <Route path='/create-profile' element= {<CreateProfile/>}/>
            <Route path='/edit-profile' element= {<EditProfile/>}/>
            <Route path='/add-experience' element= {<AddExperinace/>}/>
            <Route path='/add-education' element= {<AddEducation/>}/>
            {/* <Route path='/edit-profile' element= {<EditProfile/>}/> */}
           
            <Route path='/profiles' element= {<Profiles />}/>

            {/* <Route path='profiles' element = {<PrivateRoute> <Profiles/> </PrivateRoute>}  /> */}
               
           
          </Routes>
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




