import React from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import store from "./redux/store";

const REST_API_KEY = "c4a648b170fea0fbd26e61d052e9093b";
const REDIRECT_URI =  "http://localhost:3000/user-service/auth/kakao";

const KakaoRedirectHandler = (code) => {
    const dispatch = useDispatch();

    (async function getAccessToken() {
    
        let grant_type = "authorization_code";
        let client_id = REST_API_KEY;

        dispatch(store())
        try {
            const res = await axios.post("https://kauth.kakao.com/oauth/token"
                + "?grant_type=" + grant_type
                + "&client_id=" + client_id
                + "&redirect_uri=" + REDIRECT_URI
                + "&code=" + code,
                {
                    headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
                }
            );
            console.log(res);
            await axios.post("http://localhost:8081/user-service/auth/kakao", {
                access_token: res.data.access_token
            });
        } catch(e) {
            console.warn(e);
        }
    })();

    return <div>로그인 처리 중입니다. 잠시만 기다려주세요.</div>;
};

export default KakaoRedirectHandler;