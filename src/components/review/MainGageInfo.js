import React from "react";
import styles from "./Review.module.css";
import NavBar from "../navigation/NavBar";
import "react-alice-carousel/lib/alice-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
                            <Swiper
                                        slidesPerView={4}
                                        slidesPerGroup={3}
                                        loop={true}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Pagination, Navigation]}
                                        className="mySwiper2"
                                    >
                            <SwiperSlide><img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img></SwiperSlide>
                            <SwiperSlide><img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img></SwiperSlide>
                            <SwiperSlide><img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img></SwiperSlide>
                            <SwiperSlide><img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img></SwiperSlide>
                            <SwiperSlide><img className={styles.maingageimg2} alt="" src="/img/reviewinfoimg.png"></img></SwiperSlide>
                            </Swiper>    
                            </div>                
            </div>
        </>
    );
}

export default MainGageInfo;