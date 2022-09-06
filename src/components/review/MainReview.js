import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './MainReview.module.css';
import { useLocation, useNavigate } from "react-router";
import ReviewCounter from "./ReviewCounter";
import Review from "../mypage/Review";

function MainReview(props){
    const placeName = useLocation().pathname.split("/").pop();
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([]); // 리뷰 데이터 리스트

    // props 확인용
    useState(()=>{console.log(props.information)},[props])

    useEffect(() => {
        getUserReview();
    }, []);
    
    async function getUserReview() {
        try {
            const res = await axios.get("http://localhost:8081/review-service/review/" + placeName + "/" + 2,
            );
            res.data.forEach((e, i) => res.data[i].createdBy = e.createdBy.replaceAll("-", ". "));
            setReviewList(res.data);
        } catch(e){
            throw e;
        }
    }

    function gotoReviewPage() {
        navigate("/review/" + props.information.name);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.title}>메이트들의 생생한 리뷰를 확인해보세요</div>
                    <div className={styles.allReviewButton} onClick={gotoReviewPage}>
                        <div>전체보기</div>
                        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L10 10L1 19" stroke="#A7A7A7" strokeWidth="1.5"/>
                        </svg>
                    </div>
                </div>

                <div className={styles.bottomContainer}>
                    <div className={styles.bottomLeftContainer}>
                        <div className={styles.counterBox}>
                            <ReviewCounter
                                rateVal={[10, 999, 122]}
                            />
                        </div>
                        <div className={styles.reviewReqTextContainer}>
                            <div style={{marginRight: "10px"}}>📢</div>
                            <div>{props.information.name}에서 혼밥해본 적이 있다면 직접 리뷰를 남겨보세요</div>
                        </div>
                        <div className={styles.reviewButton} onClick={props.showModal}>
                            <div>리뷰쓰러 가기</div>
                            <svg width="34" height="10" viewBox="0 0 34 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9H31L23.1311 1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className={styles.bottomRightContainer}>
                    {reviewList.map((o, i) =>
                        <Review
                            review={o}
                            mypageMode={false}
                        />
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainReview;