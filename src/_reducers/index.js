import { combineReducers } from 'redux';
import userReducer from './user_reducer';

const rootReducer = combineReducers({ // reducer 모음
    userReducer,
})

export default rootReducer;