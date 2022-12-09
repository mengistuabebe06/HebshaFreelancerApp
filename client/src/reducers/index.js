import {combineReducers} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import jobReducer from './jobReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    job: jobReducer,
    profile: profileReducer    
})
 