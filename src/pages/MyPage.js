import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./MyPage.module.css"
import { Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/navigation/NavBar';
import { useNavigate } from 'react-router-dom';
import { changeUserInfo, reissueJWT } from '../_actions/user_action';
import Course from '../components/mypage/Course';
import Like from '../components/mypage/Like';
import Review from '../components/mypage/Review';
import Dropdown from '../components/etc/Dropdown';
import { ReactComponent as KakaoCircleSvg } from "../images/svg/kakao-circle.svg";
import { useMediaQuery } from "react-responsive"
import MobileNavBar from "../components/navigation/mobile/MobileNavBar";
import NoContent from '../components/etc/mobile/NoContent';

function MyPage() {
  const SERVER = "localhost:8081"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfo = useSelector((state) => state.userReducer.userinfo)
  const isPc = useMediaQuery({ query: "(min-width:481px)" });
  const isMobile = useMediaQuery({ query: "(max-width:480px)" });

  const [renderFlag, setRenderFlag] = useState(false); // 렌더링 할지 말지
  const [tabNum, setTabNum] = useState(0); // 0:코스 1:리뷰 2:찜

  const [courseList, setCourseList] = useState([]); // 코스 데이터 리스트
  const [currentCoursePage, setCurrentCoursePage] = useState(1); // 현재 코스 pagination
  const [totalCoursePage, setTotalCoursePage] = useState(1); // 전체 코스 pagination

  const [likeList, setLikeList] = useState([]); // 전체 찜 데이터 리스트
  const [filteredLikeList, setFilteredLikeList] = useState([]); // 필터링된 찜 데이터 리스트
  const [dropdownList, setDropdownList] = useState(["전체", "일식", "한식", "중식", "양식", "아시안", "기타"])

  const [reviewList, setReviewList] = useState([]); // 리뷰 데이터 리스트

  useEffect(() => {
    checkExp();
  }, []);

  // 수정 필요
  // invalid 시 2번 실행, rt 만료 시 실행되는 점이 원치 않는 동작임
  useEffect(() => {
    if(userinfo != null) {
      getUserData();
    }
  }, [userinfo]); // matrix에 오류나는거 넣지 마시오 (ex. userinfo.accessToken)

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
          const res = await axios.get("https://" + SERVER + "/user-service/auth/reissue",
            {
              withCredentials: true // Set-Cookie 작동을 위해 필수
            }
          );
          console.log(dispatch(reissueJWT(res.data)))

        } catch(e) {
          console.log(e);
          console.log("*** REFRESH TOKEN OUTDATED ***")
          window.alert("로그인이 필요합니다.");  
          await logOut(); // rt outdated
          navigate("/") // previous page
        }
      }
      else {
        // valid
        console.log("*** VALID USERINFO ***")
        getUserData();
      }
    }
    else {
      // not logged in
      console.log("*** NOT LOGGED IN ***")
      window.alert("로그인이 필요합니다.");
      await logOut(); // rt outdated
      navigate(-1) // previous page
    }
  }

  async function getUserData() {
    try {
      // getUser... 함수에서 던지는 error 여부를 판단한 후에 render flag를 설정해야 함
      getUserCourse()
      getUserLike()
      getUserReview()
      setRenderFlag(true) // 지금은 일단 처리 없이 해놓음
    } catch(e) {
      console.log(e)

      // clear outdated userinfo
      if (userinfo != null) {
        logOut();
      }

      window.alert("사용자 정보를 받아오는데 실패했습니다.");
      navigate(-1) // previous page
    }
  }

  async function logOut() {
    // logout
    try {
      const res = await axios.delete("https://" + SERVER + "/user-service/auth/logout",
          {
              withCredentials: true // Set-Cookie 작동을 위해 필수
          }
      );
    } catch(e) {
        console.warn(e);
    }
    dispatch(changeUserInfo(null))
  }

  function handleCategoryClick(id) {
    switch (id) {
      case 0: setTabNum(0); break;
      case 1: setTabNum(1); break;
      case 2: setTabNum(2); break;
    }
  }

  function updatePage(delta) {
    if(currentCoursePage + delta > 0 && currentCoursePage + delta <= totalCoursePage) {
      setCurrentCoursePage(currentCoursePage + delta)
    }
  }

  async function runTest() {
    try{
      const res = await axios.post("https://" + SERVER + "/user-service/user/course/",
        {
          title: "test title",
          placeNameList: [ "성수완당", "sdfg", "dgfh" ], /* temp */
          placeAddressList: [ "addr111111", "addr2222222", "addr333333" ],
          distanceList: [ 1234, 235 ],
        },
        { //header
            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
        }
      );
    } catch(e) {
      console.log(e)  
    }
  }

  async function getUserCourse() {
    try{
      const res = await axios.get("https://" + SERVER + "/user-service/user/course/all",
        { //header
            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
        }
      );
      console.log(res.data);
      setCourseList(res.data); // async -> DO NOT USE courseList
      const pages = Math.ceil(res.data.length / 2);
      if (pages > 1) {
        setTotalCoursePage(pages);
      }
    } catch(e) {
      throw e;
    }
  }

  async function getUserLike() {
    try {
      const res = await axios.get("https://" + SERVER + "/user-service/user/like/all",
        { //header
            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
        }
      );
      setLikeList(res.data);
      setFilteredLikeList(res.data);
    } catch(e){
      throw e;
    }
  }

  async function deleteCourse(id) {
    if (window.confirm('정말 삭제하시겠어요?')) {
      
      try {
        const res = await axios.delete("https://" + SERVER + "/user-service/user/course/" + id,
          { //header
              headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
          }
        );
        
        const newCourseList = courseList.filter(course => course.courseId !== id);
        setCourseList(newCourseList);
        const pages = Math.ceil(newCourseList.length / 2);

        if (pages > 0) {
          setTotalCoursePage(pages);

          // DO NOT USE totalCoursePage since it's async (use pages instead)
          if (currentCoursePage > pages) {
            setCurrentCoursePage(pages);
          }
        }

      } catch(e){
        alert("오류가 발생했습니다.")
        throw e;
      }

    }
  }

  function filterLike(gubun) {
    if (gubun == "전체") {
      setFilteredLikeList(likeList)
    }
    else {
      const filteredList = likeList.filter(like => like.gubun == gubun);
      setFilteredLikeList(filteredList);
    }
  }

  async function deleteLike(id) {
    if (window.confirm('정말 삭제하시겠어요?')) {
      try {
        const res = await axios.delete("https://" + SERVER + "/review-service/review/" + id,
          { //header
              headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
          }
        );
        // 원본에서 삭제
        const newLikeList = likeList.filter(like => like.id !== id);
        setLikeList(newLikeList);

        // 필터에서 삭제
        const newFilteredList = filteredLikeList.filter(like => like.id !== id);
        setFilteredLikeList(newFilteredList);

      } catch(e){
        alert("오류가 발생했습니다.")
        throw e;
      }
    }
  }

  async function deleteReview(id) {
    if (window.confirm('정말 삭제하시겠어요?')) {
      try {
        const res = await axios.delete("https://" + SERVER + "/review-service/review/" + id,
          { //header
              headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
          }
        );
        const newReviewList = reviewList.filter(review => review.id !== id);
        setReviewList(newReviewList);
      } catch(e){
        alert("오류가 발생했습니다.")
        throw e;
      }
    }
  }

  async function getUserReview() {
    try {
      const res = await axios.get("https://" + SERVER + "/review-service/review/user",
        { //header
            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
        }
      );
      const newData = res.data;
      newData.forEach((e, i) => res.data[i].createdBy = e.createdBy.replaceAll("-", ". "));
      setReviewList(newData);
    } catch(e){
      throw e;
    }
  }

  return (
    <>
    { userinfo != null && renderFlag ?
      <>
        {isPc && <NavBar />}
        {isMobile && <MobileNavBar />}
        {isMobile && <NoContent/>}
        {isPc &&
        <Container fluid="xxl" style={{ width: "75%", height: "100%", padding: "50px 0px 100px 0px"}}>
          {/* 상단 타이틀 */}
          {isPc &&
          <div>
          <div className={styles.title}>
            <div className={styles.profileContainer}>
              <Image
                  src={userinfo.profileImageUrl}
                  roundedCircle
                  className={styles.profileImage}
              />
              <div className={styles.userName}>{userinfo.name}</div>
              <div className={styles.userEmailContainer}>
                <KakaoCircleSvg />
                <div className={styles.userEmail}>{userinfo.email}</div>
              </div>
            </div>
            <div className={styles.welcomeContainer}>
              <div className={styles.welcomeText}>
                {<p>안녕하세요 <b7>{userinfo.name}</b7> 메이트님!<br/>오늘도 잇츠메이트와 맛있는 식사하세요 🍴</p>}
              </div>
              <div className={styles.category}>
                <div> {/* flexbox */}
                  <div onClick={() => handleCategoryClick(0)}><p>혼행 코스</p><b7>{courseList.length}</b7></div>
                  <div className={styles.separator} />
                  <div onClick={() => handleCategoryClick(1)}><p>내가 작성한 후기</p><b7>{reviewList.length}</b7></div>
                  <div className={styles.separator} />
                  <div onClick={() => handleCategoryClick(2)}><p>찜한 장소</p><b7>{likeList.length}</b7></div>
                </div>
              </div>
            </div>
          </div>

          {/* 혼행 코스 */}
          {tabNum == 0 ?
          <div>
            <div className={styles.subTitle}>
              <div className={styles.titleText}><b7>{userinfo.name}</b7> 메이트님의 혼행 코스🍚</div>
              <div className={styles.pagination}><hl>{currentCoursePage}</hl> / {totalCoursePage}</div>
              <div className={styles.arrowContainer}>
                <div className={styles.leftArrow} onClick={() => updatePage(-1)}>
                  <svg width="31" height="14" viewBox="0 0 31 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31 13H3L14.0303 1" stroke={currentCoursePage > 1 ? "#000000" : "#D2D2D2"} strokeWidth="2"/>
                  </svg>
                </div>

                <div className={styles.rightArrow} onClick={() => updatePage(1)}>
                  <svg width="31" height="14" viewBox="0 0 31 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13H28L16.9697 1" stroke={currentCoursePage >= totalCoursePage ? "#D2D2D2" : "#000000"} strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.courseList}>
              {0 < courseList.length ?
              <Course
                course={courseList[currentCoursePage*2-2]}
                deleteCourse={deleteCourse}
              />
              : null
              }
              {currentCoursePage*2-1 < courseList.length ?
              (
                0 < courseList.length ?
                <Course
                  course={courseList[currentCoursePage*2-1]}
                  deleteCourse={deleteCourse}
                />
                : null
              )
              :
              <div
                className="empty-course-container"
                style={{ width: "526px", margin: "32px auto auto auto" }}
              />
              }
            </div>
          </div>
          : null
          }

          {/* 리뷰 */}
          {tabNum == 1 ?
          <div>
            <div className={styles.subTitle}>
              <div className={styles.titleText}><b7>내가 작성한 후기</b7></div>
            </div>
            <div className={styles.reviewList}>
              {reviewList.map((o, i) =>
              <Review
                review={o}
                deleteReview={deleteReview}
                mypageMode={true}
              />
              )}
            </div>
          </div>
          : null
          }

          {/* 찜 */}
          {tabNum == 2 ?
          <div>
            <div className={styles.subTitle}>
              <div className={styles.titleText}><b7>찜한 장소</b7></div>
              <Dropdown
                category={dropdownList}
                selectHandler={filterLike}
              />
            </div>
            <div className={styles.likeList}>
              {filteredLikeList.map((o, i) =>
              <Like
                like={o}
                deleteLike={deleteLike}
              />
              )}
            </div>
          </div>
          : null
          }
        
          {/*
          <div>
            <button onClick={runTest}>save</button>
            <button onClick={getUserCourse}>getAll</button>
          </div>
          */}

          
        </div>}
        </Container>
        }
      </>
      : null
    }
    </>
  );
}

export default MyPage;
