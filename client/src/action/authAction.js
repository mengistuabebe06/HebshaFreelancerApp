import axios from "axios"
import { GET_ERRORS, SET_CURRENT_USER } from "./type"
import setAuthToken from "../utils/setAuthToken";
import jwt_decoder from 'jwt-decode'
import { decode } from "jsonwebtoken";
import { Navigate } from "react-router-dom";


// import { TEST_DISPATCH } from "./type"
// register
export const registerUser = (userdata, history) => dispatch =>{
    axios
      .post('/api/users/register', userdata)
      .then(res=> history.push('/login'))
      .catch(err=> 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
}

// Login Get user Token 

export const loginUser = userdata=> dispatch =>{
  axios
    .post('/api/users/login', userdata)
    .then(res=>{
      //save to the localstorage
      const{ token } = res.data
      //set the token to the local storage accept an string to convert object inot string
      localStorage.setItem('jwttoken', token)
      //set the token to Auth header
      setAuthToken(token)
      //Decode the token to get user data
      const decode  =  jwt_decoder(token)
      // set current user
      dispatch(setCurrentUser(decode))
    })
    .catch(err=> 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      )
}

// set logge in user
export const setCurrentUser = (decode)=> {
  return{
    type: SET_CURRENT_USER,
    payload: decode
  }
}
//log user out

export const logoutUser = ()=> dispatch=>{
  //remove token from localstorage
  localStorage.removeItem('jwtToken')
  //Remove auth header for future requests
  setAuthToken(false)
  //set the current user to {} whcih will set isAuthenticated()
  dispatch(setCurrentUser({}))
}

