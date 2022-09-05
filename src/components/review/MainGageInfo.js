import React from "react";
import styles from "./Review.module.css";
import NavBar from "../navigation/NavBar";
import { useState } from "react";
import LikeButton from "../like/LikeButton";
import { useLocation } from "react-router";

function MainGageInfo(props){
    const { state } = useLocation();

    return(
        <>
            <div className={styles.responsivewrapper}>
                
                <div className={styles.locationboxflex}>
                    <img className={styles.maingageimg} alt="" src="/img/reviewinfoimg.png"></img>
                    <br></br>
                    <div className={styles.locationboxflex}>
                    
                    </div>
                        <div className={styles.gagerightsquarebox}>
                        <div className={styles.locationboxflex}>
                        <div className={styles.gagecircle} >
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle  cx="11" cy="11" r="11" fill="#E97869"/></svg>
                        </div>
                        <div className={styles.locationboxflex}>
                        <span className={styles.gagename}>{props.information.name}{" "}</span>
                        <span className={styles.gagegubun}>{props.information.gubun}</span>
                        </div>
                        <div className={styles.likebutton}><LikeButton information={state}/></div>
                        </div>
                            <div className={styles.gagecontents}>
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
                                    <p className={styles.gageinfocontent}>{props.information.usage_of_week_and_time}</p>
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