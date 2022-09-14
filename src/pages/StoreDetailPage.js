import React, { useEffect } from "react";
import axios from 'axios';
import MainReview from "../components/review/MainReview";
import MainGageInfo from "../components/review/MainGageInfo";
import DetailMap from "../components/review/DetailMap";
import { useNavigate, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import NavBar from "../components/navigation/NavBar";
import ReviewModal from "../components/review/ReviewModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, reissueJWT } from '../_actions/user_action';
import { useMediaQuery } from "react-responsive"
import MobileNavBar from "../components/navigation/mobile/MobileNavBar";

function StoreDetailPage(){
    const SERVER = "eats-mate.com:8081"
    const userinfo = useSelector((state) => state.userReducer.userinfo)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 하단 placeName 할당 코드 절대 수정 금지 - 21/09/09
    const placeName = useLocation().pathname.split("/").pop();

    const [modalOpen, setModalOpen] = useState(false);
    const [information, setInformation] = useState({});

    const isPc = useMediaQuery({ query: "(min-width:426px)" });
    const isMobile = useMediaQuery({ query: "(max-width:426px)" });

    useEffect(() => {
      getStoreDetail();
    }, []);
  
    async function getStoreDetail() {
      try {
        const res = await axios.get("http://" + SERVER + "/map-service/findByName/?name=" + placeName);
        setInformation(res.data)
      } catch(e){
        console.log(e)
        alert("해당 식당 정보가 없습니다.")
        navigate(-1);
      }
    }

    const showModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    async function checkExp() {
      if(userinfo != null) {
        const isTokenExpired = Date.now() >= userinfo.expirationTime - 10000;
        console.log('Date.now(): ', Date.now());
        console.log('exp - 10s: ', userinfo.expirationTime - 10000);
        console.log('isTokenExpired: ', isTokenExpired);
  
        if (isTokenExpired) {
          // invalid
          console.log("*** ACCESS TOKEN OUTDATED ***")
          try {
            const res = await axios.get("http://" + SERVER + "/user-service/auth/reissue",
              {
                withCredentials: true // Set-Cookie 작동을 위해 필수
              }
            );
            console.log(dispatch(reissueJWT(res.data)))
            showModal();
  
          } catch(e) {
            console.log(e);
            console.log("*** REFRESH TOKEN OUTDATED ***")
            window.alert("로그인이 필요합니다.");  
            await logOut(); // rt outdated
          }
        }
        else {
          // valid
          console.log("*** VALID USERINFO ***")
          showModal();
        }
      }
      else {
        // not logged in
        console.log("*** NOT LOGGED IN ***")
        window.alert("로그인이 필요합니다.");
        await logOut(); // rt outdated
      }
    }

    async function logOut() {
      // logout
      try {
        const res = await axios.delete("http://" + SERVER + "/user-service/auth/logout",
            {
                withCredentials: true // Set-Cookie 작동을 위해 필수
            }
        );
      } catch(e) {
          console.warn(e);
      }
      dispatch(changeUserInfo(null))
    }

    return(
        <>
          {isPc && <NavBar />}
          {isMobile && <MobileNavBar/>}
          <Container fluid="xxl" style={{ width: "75%", height: "100%", padding: "10px 0px 100px 0px"}}>
              <div>
                  <MainGageInfo information={information}/>
                  <DetailMap information={information} />
                  <MainReview information={information} showModal={checkExp}/>
              </div>
              { modalOpen ? <ReviewModal information={information} closeModal={closeModal}/> : null }
          </Container>
        </>
    );
}

export default StoreDetailPage;