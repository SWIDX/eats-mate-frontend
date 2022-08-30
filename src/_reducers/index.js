import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import restReducer from "./restaurant_reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  // reducer 모음
  userReducer,
  restReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
