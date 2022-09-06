import React, { useEffect } from "react";
import axios from 'axios';
import MainReview from "../components/review/MainReview";
import MainGageInfo from "../components/review/MainGageInfo";
import DetailMap from "../components/review/DetailMap";
import { useLocation } from "react-router";
import { Container } from "react-bootstrap";
import NavBar from "../components/navigation/NavBar";
import ReviewModal from "../components/review/ReviewModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, reissueJWT } from '../_actions/user_action';

function StoreDetailPage(){
    const userinfo = useSelector((state) => state.userReducer.userinfo)
    const dispatch = useDispatch();

    const placeName = useLocation().pathname.split("/").pop();

    const [modalOpen, setModalOpen] = useState(false);
    const [information, setInformation] = useState({});

    useEffect(() => {
      getStoreDetail();
    }, []);
  
    async function getStoreDetail() {
      try {
        const res = await axios.get("http://localhost:8081/map-service/findByName/?name=" + placeName);
        setInformation(res.data)
      } catch(e){
        throw e;
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
            const res = await axios.get("http://localhost:8081/user-service/auth/reissue",
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
        const res = await axios.delete("http://localhost:8081/user-service/auth/logout",
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
          <NavBar />
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