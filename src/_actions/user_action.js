export const changeUserInfo = (res) => {
    return {
     type: "CHANGE_USERINFO",
     payload: res
    }
}
export const reissueJWT = (res) => {
    return {
     type: "REISSUE_JWT",
     payload: res
    }
}