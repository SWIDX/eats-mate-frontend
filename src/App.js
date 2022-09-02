import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import KakaoRedirectHandler from './components/login/KakaoRedirectHandler';
import MapPage from './pages/MapPage';
import ReviewPage from "./pages/ReviewPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import AboutPage from "./pages/AboutPage";
import MyPage from './pages/MyPage';
import "swiper/css/bundle";
import './App.css';

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
          <Route path="/review-service/main" element={<ReviewPage />} />
          <Route path="/store-detail/main" element={<StoreDetailPage/>}/>
          <Route path="/about/main" element={<AboutPage/>}/>
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
