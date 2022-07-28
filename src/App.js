import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import KakaoRedirectHandler from './components/login/KakaoRedirectHandler';
import MapPage from './pages/MapPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route
            path="/user-service/auth/kakao"
            element={<KakaoRedirectHandler />}
          />
          <Route path="/map-service/main" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
