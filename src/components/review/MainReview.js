import React, {useState} from "react";
import styles from './Review.module.css';
import ReviewModal from "./ReviewModal";
import { useNavigate } from "react-router";
import ReviewCounter from "./ReviewCounter";

function MainReview(props){
    const navigate = useNavigate();
    

    //props 확인용
    useState(()=>{console.log(props.information)},[props])

    return(
        <>
            <div className={styles.responsivewrapper}>

                <div className={styles.locationboxflex}>
                    <p className={styles.maininfomessage}>메이트들의 생생한 리뷰를 확인해보세요</p>
                    <button className={styles.forallreview}
                        onClick={() => { //store-detail -> review-service로 가도록
                        navigate("/review-service/main", {
                        state: props.information,
                        });
                    }}> 
                        <svg width="93" height="30" viewBox="0 0 93 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.58 11.5V12.84H14.18V19.7H15.84V6.56H14.18V11.5H10.58ZM11.64 15.72C9.04 14.8 7.28 12.56 7.28 10.22V9.34H11.22V8H1.64V9.34H5.64V10.24C5.64 12.78 3.78 15.16 1.12 16.12L1.98 17.4C4.08 16.64 5.72 14.98 6.5 12.94C7.28 14.78 8.82 16.28 10.82 17L11.64 15.72ZM6.02 22.74V18.54H4.36V24.08H16.34V22.74H6.02ZM23.8784 11.2H27.1984V9.84H23.8984V7.18H22.3184V9.84H18.9984V11.2H22.3184V12.06C22.3184 15 20.9384 18.14 18.5184 19.58L19.4784 20.8C21.2384 19.74 22.4984 17.74 23.1184 15.46C23.7784 17.62 25.0584 19.44 26.7984 20.42L27.7384 19.18C25.3184 17.88 23.8784 14.92 23.8784 12.06V11.2ZM28.7184 13.62H25.9784V14.98H28.7184V23.54H30.2784V6.96H28.7184V13.62ZM32.3184 6.54V24.46H33.8984V6.54H32.3184ZM39.7969 12.36H48.9569V15.66H39.7969V12.36ZM45.1969 20.84V16.98H50.5569V7.82H48.9569V11.02H39.7969V7.82H38.1769V16.98H43.5369V20.84H36.2569V22.18H52.5169V20.84H45.1969ZM54.9153 8.48V9.8H61.6553C61.3153 14.06 58.9153 17.5 54.0953 19.8L54.9753 21.14C60.9353 18.22 63.3153 13.66 63.3153 8.48H54.9153ZM66.9353 6.54V24.48H68.5753V6.54H66.9353Z" fill="#A7A7A7"/>
                        <path d="M82 7L91 16L82 25" stroke="#A7A7A7" stroke-width="1.5"/>
                        </svg>
                    </button>
                </div>


                <div className={styles.locationboxflex}>
                    <div className={styles.locationboxflex2}>
                        <ReviewCounter
                            rateVal={[10, 999, 122]}
                        />
                        <div className={styles.locationboxflex}>
                        <img className={styles.rrr} src="/img/rrr.png"></img>
                        <div className={styles.locationboxflex2}>
                        <div className={styles.rrrcontent}>{props.information.name}에서 혼밥해본 적이 있다면 직접 리뷰를 남겨보세요</div>
                        <div>
                        <button className={styles.modalbutton2} onClick={props.showModal}><img src="/img/goreview.png"></img></button>
                        </div>
                    </div>
                    </div>
                </div>
             
            
                
                    <div className={styles.locationboxflex2}>

                    <div className={styles.box2}>
                        <div className={styles.locationboxflex}>
                        <img className={styles.bestcontent} alt="" src="/img/bestcontent.png"></img>
                        <img className={styles.count} alt="" src="/img/count.png"></img>
                        </div>
                        <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                        <div className={styles.locationboxflex}>
                        <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                        <div className={styles.reviewwriter}>나는야먹짱</div>
                        <div className={styles.reviewdate}> | 2022.01.08</div>
                        </div>
                    </div>
                
                    <div className={styles.box2}>
                            <div className={styles.locationboxflex}>
                            <img className={styles.bestcontent} alt="" src="/img/bestcontent.png"></img>
                            <img className={styles.count} alt="" src="/img/count.png"></img>
                            </div>
                            <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                            <div className={styles.locationboxflex}>
                            <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                            <div className={styles.reviewwriter}>나는야먹짱</div>
                            <div className={styles.reviewdate}> | 2022.01.08</div>
                            </div>
                        </div>
                    </div>

                    </div>

            </div>    

    
        </>
    );
}

export default MainReview;