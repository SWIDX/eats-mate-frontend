import React from 'react';
import styles from "./MainSlideBar.module.css";
import leftBtn from "./icons/slide left.png";
import rightBtn from "./icons/slide right.png";
import slideBtn from "./icons/slide btn.png";

function MainSlideBar() {

    function imgClick() {
        alert("이미지 클릭 이벤트 함수 실행");
    } // img click event function

    function leftBtnClick() {
        alert("왼쪽 버튼 클릭 이벤트 함수 실행");
    } // left button click event function

    function rightBtnClick() {
        alert("오른쪽 버튼 클릭 이벤트 함수 실행");
    } // right button click event function

    function listBtnClick() {
        alert("리스트 버튼 클릭 이벤트 함수 실행");
    } // list button click event function

    return (
        <div className="MainSlideBar">
            <img className={styles.image} alt="slide img" onClick={() => imgClick()} src="/img/slide img.png" />
            <img className={styles.leftBtn} alt="slide left" onClick={() => leftBtnClick()} src={leftBtn} />
            <img className={styles.rightBtn} alt="slide right" onClick={() => rightBtnClick()} src={rightBtn} />
            <img className={styles.slideBtn} alt="slide slide" onClick={() => rightBtnClick()} src={slideBtn} />
            <div className={styles.listBtn}>
				<ul>
					<li><button onClick={() => listBtnClick()}>전체</button></li>
					<li><button onClick={() => listBtnClick()}>한식</button></li>
					<li><button onClick={() => listBtnClick()}>중식</button></li>
					<li><button onClick={() => listBtnClick()}>일식</button></li>
				</ul>
			</div>
        </div>
    );

}

export default MainSlideBar;