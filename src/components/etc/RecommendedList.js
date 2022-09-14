import React, { useState } from "react";
import { useNavigate } from 'react-router';
import styles from "./RecommendedList.module.css";

const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const hours = today.getHours(); // const minutes = today.getMinutes();
const time = month + "월 " + date + "일 " + hours + ":" + "00시 기준";

const address = "주소 변수";
const name = "식당명 변수";
const gubun = "카테고리 변수";

function RecommendedList() {

    const [storeInfo, setStoreInfo] = useState({first_store:"앙카라피크닉", second_store:"한끼마끼", third_store:"송화산시도삭면 본점"});
    const navigate = useNavigate();

    return (
        <>
        <div className={styles.parent}>
            <div className={styles.child}>
            <span className={styles.timeformedia}>{time}</span>
                <div className={styles.maininfomessage}>인기있는 맛집을 알려드려요</div>
                    <div className={styles.wrap}>
                        <div className={styles.element_list}>
                            <div className={styles.element}
                                onClick={() => {
                                    navigate('/detail/' + storeInfo.first_store);
                            }}>
                                <img className={styles.recommendimage} alt="recommended list img1" src="/img/recommendImg1.png" />
                                <div className={styles.recommendContent}>
                                    <div className={styles.title}>
                                        <img className={styles.locationimage} alt="location img" src="/img/location_color.png" />
                                        <div className={styles.address}>용산구</div>
                                    </div>
                                    <div className={styles.name}>{storeInfo.first_store}<span> 기타</span></div>
                                    <div className={styles.ment}>오늘 20명이 <span>찜</span>했어요</div>
                                </div>
                            </div>
                            <div className={styles.element}
                                onClick={() => {
                                    navigate('/detail/' + storeInfo.second_store);
                            }}>
                                <img className={styles.recommendimage} alt="recommended list img2" src="/img/recommendImg2.png" />
                                <div className={styles.recommendContent}>
                                    <div className={styles.title}>
                                        <img className={styles.locationimage} alt="location img" src="/img/location_color.png" />
                                        <div className={styles.address}>서대문구</div>
                                    </div>
                                    <div className={styles.name}>한끼마끼<span> 일식</span></div>
                                    <div className={styles.ment}>오늘 5명이 <span>리뷰</span>를 남겼어요</div>
                                </div>
                            </div>
                            <div className={styles.element}
                                onClick={() => {
                                    navigate('/detail/' + storeInfo.third_store);
                            }}>
                                <img className={styles.recommendimage} alt="recommended list img3" src="/img/recommendImg3.png" />
                                <div className={styles.recommendContent}>
                                    <div className={styles.title}>
                                        <img className={styles.locationimage} alt="location img" src="/img/location_color.png" />
                                        <div className={styles.address}>광진구</div>
                                    </div>
                                    <div className={styles.name}>송화산시도삭면<span> 일식</span></div>
                                    <div className={styles.ment}>오늘 <span>조회수</span>가 가장 많아요</div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
            </>
    );

}

export default RecommendedList;
