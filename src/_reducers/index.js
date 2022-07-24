import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ // reducer 모음
    userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;