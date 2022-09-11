import React, { useEffect, useState } from "react";
import styles from "./ReviewPage.module.css";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Review from "../components/mypage/Review";
import { Container } from "react-bootstrap";
import NavBar from "../components/navigation/NavBar";
import Carousel from "../components/etc/Carousel";
import Dropdown from "../components/etc/Dropdown";
import ReviewCounter from "../components/review/ReviewCounter";
import ReviewModal from "../components/review/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, reissueJWT } from '../_actions/user_action';
import { useMediaQuery } from "react-responsive"
import Burger from '../components/navigation/mobile/Burger';

function ReviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeName = useLocation().pathname.split("/").pop();
  const userinfo = useSelector((state) => state.userReducer.userinfo)
  const isPc = useMediaQuery({ query: "(min-width:426px)" });
  const isMobile = useMediaQuery({ query: "(max-width:426px)" });

  const [reviewList, setReviewList] = useState([]); // 리뷰 데이터 리스트
  const [dynReviewList, setDynReviewList] = useState([]);
  const [information, setInformation] = useState({}); // 가게 정보
  const [rateList, setRateList] = useState([]);
  const [dropdownList, setDropdownList] = useState(["최신순", "인기순"]);
  const [imgData, setImgData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getInformation();
    getUserReview();
    getReviewRate();
  }, []);

  async function getInformation() {
    try {
      const res = await axios.get("http://localhost:8081/map-service/findByName/?name=" + placeName);
      setInformation(res.data)
    } catch(e){
      throw e;
    }
  }

  async function getUserReview() {
    try {
      const res = await axios.get("http://localhost:8081/review-service/review/?place_name=" + placeName + "&amount=" + 0,
      );
      res.data.forEach((e, i) => res.data[i].createdBy = e.createdBy.replaceAll("-", ". "));
      setReviewList(res.data);
      setDynReviewList(res.data);
      getCarouselImage(res.data);
    } catch(e){
      throw e;
    }
  }

  async function getReviewRate() {
    try {
      const res = await axios.get("http://localhost:8081/review-service/review/count?place_name=" + placeName);
      setRateList(res.data);
    } catch(e){
      throw e;
    }
  }

  function getCarouselImage(reviewData) {
    let slideList = []
    reviewData.map((review) => {
      console.log(review.images)
      if (review.images[0] != "") {
        for (const imageLink of review.images) {
          const slide = {}
          slide['image'] = imageLink;
          slide['link'] = imageLink;
          slideList = [...slideList, slide];
        }
      }
    })
    setImgData(slideList)
    console.log(slideList)
  }

  function sortReview(selection) {
    if (selection == "최신순") {
      setDynReviewList(reviewList)
    }
    else {
      console.log(dynReviewList)
      const sortedList = dynReviewList.sort((a, b) => b.recommend - a.recommend);
      setDynReviewList(sortedList);
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

  return (
    <>
      {isPc && <NavBar />}
      {isMobile && <Burger />}
      <Container fluid="xxl" style={{ width: "75%", height: "100%", padding: "50px 0px 100px 0px"}}>

        <div style={{display: "flex", flexDirection: "column"}}>
          <div className={styles.backButton} onClick={() => {navigate(-1);}}>
            <svg width="166" height="16" viewBox="0 0 166 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.128 1.472V2.88C27.128 5.008 25.896 6.976 23.592 7.792L24.472 9.12C27.064 8.16 28.504 5.744 28.504 2.88V1.472H27.128ZM27.448 1.472V3.024C27.448 5.616 28.888 7.824 31.368 8.704L32.248 7.392C30.056 6.672 28.808 4.912 28.808 3.024V1.472H27.448ZM33.464 0.704V9.472H35.144V0.704H33.464ZM34.68 4.304V5.696H37.208V4.304H34.68ZM30.44 9.84C27.416 9.84 25.56 10.848 25.56 12.576C25.56 14.304 27.416 15.312 30.44 15.312C33.448 15.312 35.304 14.304 35.304 12.576C35.304 10.848 33.448 9.84 30.44 9.84ZM30.44 11.152C32.472 11.152 33.64 11.648 33.64 12.576C33.64 13.504 32.472 14 30.44 14C28.408 14 27.224 13.504 27.224 12.576C27.224 11.648 28.408 11.152 30.44 11.152ZM43.5588 5.792V7.168H46.1988V5.792H43.5588ZM40.6627 2.032V4.672C40.6627 7.168 39.6547 9.776 37.5907 11.024L38.6147 12.288C40.8387 10.928 41.9587 7.84 41.9587 4.672V2.032H40.6627ZM41.0147 2.032V4.608C41.0147 7.584 41.9907 10.608 44.1828 11.968L45.1267 10.656C43.1747 9.424 42.2787 6.96 42.2787 4.608V2.032H41.0147ZM48.6947 0.704V15.328H50.2948V0.704H48.6947ZM45.7188 0.976V14.624H47.2867V0.976H45.7188ZM62.8535 0.704V15.328H64.4535V0.704H62.8535ZM58.2775 6.16V7.632H60.4855V6.16H58.2775ZM59.9895 1.024V14.592H61.5735V1.024H59.9895ZM52.0055 2.464V3.824H58.6775V2.464H52.0055ZM51.9255 11.856C53.7655 11.856 56.7735 11.792 59.0615 11.328L58.9495 10.112C56.7255 10.416 53.6055 10.464 51.7335 10.464L51.9255 11.856ZM53.0775 3.328V10.848H54.5975V3.328H53.0775ZM56.0695 3.328V10.848H57.5895V3.328H56.0695ZM76.3243 0.688V15.344H78.0043V0.688H76.3243ZM70.2123 1.776C68.0363 1.776 66.4523 3.776 66.4523 6.928C66.4523 10.08 68.0363 12.096 70.2123 12.096C72.4043 12.096 73.9883 10.08 73.9883 6.928C73.9883 3.776 72.4043 1.776 70.2123 1.776ZM70.2123 3.296C71.4923 3.296 72.3723 4.656 72.3723 6.928C72.3723 9.216 71.4923 10.592 70.2123 10.592C68.9323 10.592 68.0523 9.216 68.0523 6.928C68.0523 4.656 68.9323 3.296 70.2123 3.296ZM83.763 2.896V4.944C83.763 7.44 82.243 10.176 79.987 11.216L80.947 12.544C83.459 11.344 85.107 8.16 85.107 4.944V2.896H83.763ZM84.115 2.896V4.944C84.115 8.08 85.763 11.04 88.307 12.176L89.235 10.848C86.947 9.888 85.443 7.36 85.443 4.944V2.896H84.115ZM80.515 2.16V3.552H88.691V2.16H80.515ZM90.403 0.704V15.328H92.083V0.704H90.403ZM94.1298 12.24V13.616H107.378V12.24H94.1298ZM99.8898 9.264V12.8H101.554V9.264H99.8898ZM95.6818 1.728V3.072H104.13V5.024H95.7138V9.072H97.3778V6.352H105.794V1.728H95.6818ZM95.7138 8.384V9.744H106.13V8.384H95.7138ZM116.922 4.992V7.696H118.586V4.992H116.922ZM112.858 4.352V5.68H122.81V4.352H112.858ZM112.858 1.232V5.072H114.522V2.576H122.666V1.232H112.858ZM111.146 6.864V8.192H124.362V6.864H111.146ZM112.714 9.216V10.48H121.066V11.536H112.73V14.272H114.394V12.72H122.714V9.216H112.714ZM112.73 13.904V15.184H123.13V13.904H112.73ZM129.129 1.776C126.953 1.776 125.385 3.776 125.385 6.928C125.385 10.08 126.953 12.096 129.129 12.096C131.305 12.096 132.873 10.08 132.873 6.928C132.873 3.776 131.305 1.776 129.129 1.776ZM129.129 3.296C130.393 3.296 131.273 4.656 131.273 6.928C131.273 9.216 130.393 10.592 129.129 10.592C127.865 10.592 126.985 9.216 126.985 6.928C126.985 4.656 127.865 3.296 129.129 3.296ZM134.889 0.704V15.328H136.569V0.704H134.889ZM136.185 6.4V7.792H138.841V6.4H136.185ZM148.968 0.688V15.312H150.648V0.688H148.968ZM150.2 6.48V7.856H152.84V6.48H150.2ZM145.176 2.24V2.528C145.176 6.432 143.24 9.36 139.288 11.376L140.232 12.656C145.016 10.256 146.824 6.496 146.824 2.24H145.176ZM140.024 2.24V3.6H146.04V2.24H140.024ZM163.783 0.704V15.328H165.463V0.704H163.783ZM159.495 2.256V2.544C159.495 6.448 157.719 9.344 153.511 11.376L154.391 12.72C159.415 10.272 161.143 6.592 161.143 2.256H159.495ZM154.231 2.256V3.6H160.247V2.256H154.231Z" fill="black"/>
            <path d="M8 1L2 7L8 13" stroke="black" stroke-width="1.5"/>
            </svg>
          </div>

          <div className={styles.category}>{information.gubun}</div>
          <div className={styles.name}>{information.name}</div>

          <div className={styles.subTitle}>
            <div className={styles.titleText}>총 {reviewList.length}건의 리뷰가 있어요</div>
            <Dropdown
              category={dropdownList}
              selectHandler={sortReview}
            />
          </div>

          <div className={styles.forresponsive}>
            <div className={styles.counterBox}>
                <ReviewCounter
                  rateVal={rateList}
                />
            </div>
            <div style={{margin: "0px 20px", overflow: "visible"}}>
              <div style={{width: "460px"}}>
                <Carousel
                  dataList={imgData}
                  outerViewWidth={"400px"}
                  outerViewHeight={"150px"}
                  imageWidth={"150px"}
                  imageHeight={"150px"}
                  imageRadius={2}
                  gap={16}
                  innerViewOverflow={"hidden"}
                  buttonSize={48}
                  scrollStep={"one"}
                  autoScroll={true}
                  showBullets={false}
                />
              </div>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
              <div className={styles.reviewReqTextContainer}>
                  <div style={{marginRight: "10px"}}>📢</div>
                  <div>{information.name}에서 혼밥해본 적이 있다면 직접 리뷰를 남겨보세요</div>
              </div>
              <div className={styles.reviewButton} onClick={checkExp}>
                  <div>리뷰쓰러 가기</div>
                  <svg width="34" height="10" viewBox="0 0 34 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9H31L23.1311 1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
              </div>
            </div>
          </div>
          
          { modalOpen ? <ReviewModal information={information} closeModal={closeModal}/> : null }

        </div>

        {dynReviewList.map((o, i) =>
          <Review
            review={o}
            mypageMode={false}
          />
        )}
      </Container>
    </>
  );
}

export default ReviewPage;
