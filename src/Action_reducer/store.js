import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import characterReducer from './reducers'

const characterStore = configureStore({
    reducer:{
        CharacterReducer:characterReducer
    }
},applyMiddleware(thunk))

export default characterStore;