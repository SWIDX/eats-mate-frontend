import React from "react";
import styles from "./Login.module.css";
import { ReactComponent as KakaoLoginSvg } from "../../images/svg/kakao-login.svg";
import MobileKakaoLogin from "../../images/mobile_kakao_login.png"

const SERVER = "localhost:3000"; // FE
const REST_API_KEY = "b16b8c54e2c2b7fc607ed0c23abd4160";
const REDIRECT_URI =  `http://${SERVER}/user-service/auth/kakao`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function LoginButton() {

    return (
        <a href={KAKAO_AUTH_URL}>
            <KakaoLoginSvg className={styles.kakao_btn} />
            <img className={styles.mobilelogin} alt="" src={MobileKakaoLogin} />
        </a>
    );
}

export default LoginButton;