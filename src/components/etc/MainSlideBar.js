import React, { useEffect, useState, useRef } from 'react';
import styles from "./MainSlideBar.module.css";
import leftBtn from "./icons/slide left.png";
import rightBtn from "./icons/slide right.png";

function MainSlideBar() {

    const [slideState, setSlideState] = useState(0);
    const slideRef = useRef(null);
    const SLIDES_NUM = 3; // 4

    function imgClick() {
        alert("소개 페이지 연결");
    } // img click event function

    function leftBtnClick() {
        if(slideState === 0) {
            setSlideState(SLIDES_NUM);
         } else {
            setSlideState(slideState - 1);
        }
    } // left button click event function

    function rightBtnClick() {
        if(slideState >= SLIDES_NUM) {
            setSlideState(0)
        } else {
            setSlideState(slideState + 1);
        }
    } // right button click event function

    function pointBtnClick(num) {
            setSlideState(num);
    } // point button click event function

    useEffect(()=> {
        slideRef.current.style.transition ="all 0.5s ease-in-out";
        slideRef.current.style.transform= `translateX(-${slideState}00%)`;
      }, [slideState]);

    return (
        <div className={styles.slideShow}>
            <input type="radio" name="slide" id="slide1" checked />
            <input type="radio" name="slide" id="slide2" />
            <input type="radio" name="slide" id="slide3" />
            <input type="radio" name="slide" id="slide4"/ >
            <div className={styles.slides} ref={slideRef}>
                <img className={styles.image} alt="slide img"  onClick={() => imgClick()}  src="/img/slideImg1.png" />
                <img className={styles.image} alt="slide img" onClick={() => imgClick()}  src="/img/slideImg2.png" />
                <img className={styles.image} alt="slide img" onClick={() => imgClick()}  src="/img/slideImg3.png" />
            </div>
            <img className={styles.leftBtn} alt="slide left" onClick={() => leftBtnClick()} src={leftBtn} />
            <img className={styles.rightBtn} alt="slide right" onClick={() => rightBtnClick()} src={rightBtn} />

            <div className={styles.bullets}>
                <label for="slide1" onClick={() => pointBtnClick(0)}>&nbsp;</label>
                <label for="slide2" onClick={() => pointBtnClick(1)}>&nbsp;</label>
                <label for="slide3" onClick={() => pointBtnClick(2)}>&nbsp;</label>
                <label for="slide4" onClick={() => pointBtnClick(3)}>&nbsp;</label>
            </div>
        </div>
    );

}

export default MainSlideBar;