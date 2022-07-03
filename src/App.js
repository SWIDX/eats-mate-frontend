// import { Route, Routes} from 'react-router-dom';
// import KakaoRedirectHandler from './KakaoRedirectHandler';
// import login from './login';
import {KAKAO_AUTH_URL} from './OAuth.js';

function App() {
  return (
    <div classname="App">
      {/* <Routes> */}
      {/* <Route exact path="/signin" element={login} /> */}
        {/* <Route path="/oauth/callback/kakao" element={KakaoRedirectHandler} /> */}
      {/* </Routes> */}
        <div className="kakao_btn">
           <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>
        </div>
    </div>
  );
}

export default App;