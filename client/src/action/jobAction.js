import axios from 'axios'

import { GET_JOBS, GET_ERRORS,JOb_LOADING } from "./type";

export const getJob = () => dispatch =>{
    dispatch(setJobLoading());
    axios
        .get('/api/job')
        .then(res => 
            dispatch({
                type: GET_JOBS,
                payload: res.data
            })
        )
      .catch(err =>
          dispatch({
              type:GET_ERRORS,
              payload: {}
          }))
  }

  //profile loading
export const setJobLoading = () =>{
    return{
        type: JOb_LOADING,
    }
    }