import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootRducer from './reducers'

const initialState = {}

const middleware = [thunk]
// the first parameter [] is the root reducer which is index.js
const store = createStore(
    rootRducer, 
    initialState, 
    compose( 
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
   )

export default store;