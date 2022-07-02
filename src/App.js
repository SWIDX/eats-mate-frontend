import { Route, Routes} from 'react-router-dom';
import KakaoRedirectHandler from './KakaoRedirectHandler';
import login from './login';

function App() {
  return (
    <div classname="App">
      <Routes>
      <Route exact path="/signin" element={login} />
        <Route path="/oauth/callback/kakao" element={KakaoRedirectHandler} />
      </Routes>
    </div>
  );
}

export default App;