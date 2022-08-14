import React from "react";
import styles from "./Review.module.css";
import axios from "axios";


function AllReview(){
    return(
        <>
            <div className={styles.responsivewrapper}>
                <br></br><br></br>
                <p className={styles.gagename}>총 3건의 리뷰가 있어요</p>
                <hr/>

                <div className={styles.locationboxflex}>
                    <div className={styles.ratebox}></div>
                    <div className={styles.rrrcontent}><img src="/img/rrr.png"></img>성수완당에서 혼밥해본 적이 있다면 직접 리뷰를 남겨보세요</div>
                </div>
             

                <div className={styles.locationboxflex}>
                    <img className={styles.bestcontent} alt="" src="/img/bestcontent.png"></img>
                    <img className={styles.count} alt="" src="/img/count.png"></img>
                </div>
                
                <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                <img className={styles.reviewimg} src="/img/emonga.jpeg" alt="first pic" />

                <div className={styles.locationboxflex}>
                    <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                    <div className={styles.reviewwriter}>나는야먹짱</div>
                    <div className={styles.reviewdate}> | 2022.01.08</div>
                </div>

                <hr/>

                <div className={styles.locationboxflex}>
                    <img className={styles.bestcontent} alt="" src="/img/bestcontent.png"></img>
                    <img className={styles.count} alt="" src="/img/count.png"></img>
                </div>

                <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                <img className={styles.reviewimg} src="/img/emonga.jpeg" alt="first pic" />

                <div className={styles.locationboxflex}>
                    <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                    <div className={styles.reviewwriter}>나는야먹짱</div>
                    <div className={styles.reviewdate}> | 2022.01.08</div>
                </div>

            </div>
        </>

    );
}

export default AllReview;