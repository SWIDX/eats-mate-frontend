import React from "react";
import styles from "./Login.module.css";
import { ReactComponent as KakaoLoginSvg } from "../../images/svg/kakao-login.svg";


const REST_API_KEY = "c4a648b170fea0fbd26e61d052e9093b";
const REDIRECT_URI =  "http://localhost:3000/user-service/auth/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function LoginButton() {

    return (
        <a href={KAKAO_AUTH_URL}>
            <KakaoLoginSvg className={styles.kakao_btn} />
        </a>
    );
}

export default LoginButton;