import React from "react";
import styles from "./Review.module.css";
import NavBar from "../navigation/NavBar";
function MainGageInfo(){


    return(
        <>
         <NavBar />
            <div className={styles.responsivewrapper}>
 

                        <div className={styles.locationboxflex}>
                            <img className={styles.maingageimg} alt="" src="/img/reviewinfoimg.png"></img>
                            <br></br>
                            <div className={styles.locationboxflex}>
                            
                            </div>
                                <div className={styles.gagerightsquarebox}>
                                    <p className={styles.gagename}>성수완당 본점</p>
                                    <hr/>
                                    <div>
                                        <div className={styles.locationboxflex}>
                                            <img className={styles.gageimg} alt="" src="/img/location.png"></img>
                                            <p className={styles.gageinfoname}>주소</p>
                                        </div>
                                        <p className={styles.gageinfocontent}>서울 광진구 동일로22길 117-14</p>
                                    </div>
                                    <div>
                                      <div className={styles.locationboxflex}>
                                            <img className={styles.gageimg} alt="" src="/img/call.png"></img>
                                            <p className={styles.gageinfoname}>전화번호</p>
                                      </div>
                                        <p className={styles.gageinfocontent}>0507 - 1448 - 5243</p>
                                    </div>
                                    <div>
                                        <div className={styles.locationboxflex}>
                                            <img className={styles.gageimg} alt="" src="/img/time.png"></img>
                                            <p className={styles.gageinfoname}>영업시간</p>
                                        </div>   
                                            <p className={styles.gageinfocontent}>월~토 11:00~21:00</p>
                                            <p className={styles.gageinfocontent}>브레이크타임 15:00~17:00</p>
                                            <p className={styles.gageinfocontent2}>*일요일 휴무</p>
                                    </div>
                                </div>
                            </div>

                            <img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img>
                            <img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img>
                            <img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img>
                            <img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img>

            </div>
        </>
    );
}

export default MainGageInfo;