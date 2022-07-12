import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import KakaoRedirectHandler from './components/login/KakaoRedirectHandler'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route path="/user-service/auth/kakao" element={<KakaoRedirectHandler />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;