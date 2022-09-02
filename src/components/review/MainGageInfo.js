import React from "react";
import styles from "./Review.module.css";
import NavBar from "../navigation/NavBar";


function MainGageInfo(props){

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
                                <img className={styles.one} alt="" src="/img/one.png"></img>
                                    <p className={styles.gagename}>{props.information.name}</p>
                                    <hr/>
                                    <div>
                                        <div className={styles.locationboxflex}>
                                            <img className={styles.gageimg} alt="" src="/img/location.png"></img>
                                            <p className={styles.gageinfoname}>주소</p>
                                        </div>
                                        <p className={styles.gageinfocontent}>{props.information.address}</p>
                                    </div>
                                    <div>
                                      <div className={styles.locationboxflex}>
                                            <img className={styles.gageimg} alt="" src="/img/call.png"></img>
                                            <p className={styles.gageinfoname}>전화번호</p>
                                      </div>
                                        <p className={styles.gageinfocontent}>{props.information.cntct}</p>
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

                            <div className={styles.carouselsize3}>

                            </div>                
            </div>
        </>
    );
}

export default MainGageInfo;