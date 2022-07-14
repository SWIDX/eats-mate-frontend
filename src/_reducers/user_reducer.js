const initialState = {
    userinfo: null,
}
  
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_USERINFO":
        return {
            ...state,
            userinfo: action.payload,
        }
        default:
            return state
    }
}