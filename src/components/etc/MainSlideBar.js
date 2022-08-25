import React from 'react';
import styles from "./MainSlideBar.module.css";
import leftBtn from "./icons/slide left.png";
import rightBtn from "./icons/slide right.png";

function MainSlideBar() {

    function imgClick() {
        alert("소개 페이지 연결");
    } // img click event function

    function leftBtnClick() {
        alert("왼쪽 버튼 클릭 이벤트 함수 실행");
    } // left button click event function

    function rightBtnClick() {
        alert("오른쪽 버튼 클릭 이벤트 함수 실행");
    } // right button click event function

    return (
        <div className={styles.list}>
            <input type="radio" name="slide" id="slide1" />
            <input type="radio" name="slide" id="slide2" checked />
            <input type="radio" name="slide" id="slide3" />
            <input type="radio" name="slide" id="slide4"/ >
            <ul id="imgholder">
                <li><img className={styles.image1} alt="slide img"  onClick={() => imgClick()}  src="/img/slideImg1.png" /></li>
                <li><img className={styles.image2} alt="slide img" onClick={() => imgClick()}  src="/img/slideImg2.png" /></li>
                <li><img className={styles.image3} alt="slide img" onClick={() => imgClick()}  src="/img/slideImg3.png" /></li>
            </ul>
            <img className={styles.leftBtn} alt="slide left" onClick={() => leftBtnClick()} src={leftBtn} />
            <img className={styles.rightBtn} alt="slide right" onClick={() => rightBtnClick()} src={rightBtn} />

            <div className={styles.bullets}>
                <label for="slide1">&nbsp;</label>
                <label for="slide2">&nbsp;</label>
                <label for="slide3">&nbsp;</label>
                <label for="slide4">&nbsp;</label>
            </div>
        </div>
    );

}

export default MainSlideBar;