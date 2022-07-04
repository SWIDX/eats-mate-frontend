import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginButton from './LoginButton';
import KakaoRedirectHandler from './KakaoRedirectHandler';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<div><LoginButton /></div>} />
                    <Route path="/user-service/auth/kakao" element={<KakaoRedirectHandler />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;