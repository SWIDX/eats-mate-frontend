
import React, { useEffect } from "react";
import axios from 'axios';


const REST_API_KEY = "c4a648b170fea0fbd26e61d052e9093b";
const REDIRECT_URI =  "http://localhost:3000/user-service/auth/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {

    useEffect(()=> {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        let grant_type = "authorization_code";
        let client_id = "c4a648b170fea0fbd26e61d052e9093b";
    
        axios.post(`https://kauth.kakao.com/oauth/token?
            grant_type=${grant_type}
            &client_id=${client_id}
            &redirect_uri=http://localhost:3000/user-service/auth/kakao
            &code=${code}`,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then((res) => {
          axios.post("http://localhost:8081/user-service/auth/kakao", {
          access_token: res.access_token
        });
          console.log(res)
      })
      }, [])
    
    return (
        <div className="kakao_btn">
            <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>
        </div>
    );
}

export default Login;