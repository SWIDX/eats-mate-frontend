import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";


//여기서 코드를 reducer로 만들어줌 <- 관리 쉽게 하기 위해서
export default combineReducers({
    LoginReducer
});