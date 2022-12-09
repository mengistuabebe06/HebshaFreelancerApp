import { GET_JOBS, JOb_LOADING  } from "../action/type";
import isEmpty from "../validation/is-Empty";

const initialstate = {
    job: null,
    loading: false
}

export default function (state = initialstate , action) {
    switch(action.type){
        case JOb_LOADING:
            return {
                ...state,
                loading: true,
            }
            break
        case GET_JOBS:
            return{
                ...state,
                job: action.payload,
                loading: false
            }
            break
            default:
                return state
    }
}