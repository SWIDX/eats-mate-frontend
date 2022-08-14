import React from "react";
import styles from "./Review.module.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import NavBar from "../navigation/NavBar";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function ReviewInfo(){


    return(
        <>
         <NavBar />
            <div className={styles.responsivewrapper}>
                    <img className="back" alt="" src="/img/back.png"/>
                    <p className= {styles.category}>일식</p>
                    <p className={styles.name}>성수명당</p>

                        <div className={styles.locationboxflex}>
                                <div className={styles.carouselsize}>
                                    <Swiper
                                        slidesPerView={3}
                                        spaceBetween={30}
                                        slidesPerGroup={3}
                                        loop={true}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Pagination, Navigation]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide><img className={styles.reviewimgs} alt="" src="/img/reviewinfoimg.png" /></SwiperSlide>
                                        <SwiperSlide><img className={styles.reviewimgs} alt="" src="/img/reviewinfoimg.png" /></SwiperSlide>
                                        <SwiperSlide><img className={styles.reviewimgs} alt="" src="/img/reviewinfoimg.png" /></SwiperSlide>
                                    </Swiper>
                                </div>
                            
                                <div className={styles.gagerightbox}>
                                    <p className={styles.gagename}>가게 정보</p>
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
            </div>
        </>
    );
}

export default ReviewInfo;