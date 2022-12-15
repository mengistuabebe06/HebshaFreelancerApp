import axios from 'axios'
// import { response } from 'express';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './type'

//GET THE CURRENT profile
export const getCurrentProfile = () => dispatch =>{
dispatch(setProfileLoading());
axios
    .get('/api/profile')
    .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    )
};
// create a profile
export const createProfile = (profileData, history)=> dispatch =>{
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/job'))
        .catch(err=> 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
            )
}
//profile loading
export const setProfileLoading = () =>{
return{
    type: PROFILE_LOADING,
}
}

//Clear profile 
export const CrearCurrentProfile = () =>{
    return{
        type: CLEAR_CURRENT_PROFILE,
    }
}

//add experiance here
export const addExperinace = (expdata, history) => dispatch=>{
    axios
        .post('/api/profile/experience',expdata)
        .then(res=> history.push('/profile'))
        .catch(err=>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}
//add the education inforation of the profile
export const addEducation = (eduData, history)=> dispatch =>{
    axios
        .post('/api/profile/education', eduData)
        .then(res => history.push('/job'))
        .catch(err =>
            dispatch ({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}
// delete accoutn and profile
export const deleteAccount = () => dispatch =>{
    if(window.confirm('Are You Sure? This is not be undone!')){
        axios
            .delete('/api/profile')
            .then(res =>
                dispatch={
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            .catch(err=> 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }))
    }
}