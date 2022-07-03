const CLIENT_ID = "c4a648b170fea0fbd26e61d052e9093b";
const REDIRECT_URI =  "https://localhost:8081/user-service/auth/kakao";


export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function login(){
    return (
        <>
            <a href={KAKAO_AUTH_URL}>
                <div 
                    className="kakao_btn" 
                    >
                </div>
            </a>
        </>
    )
    
}
export default login;