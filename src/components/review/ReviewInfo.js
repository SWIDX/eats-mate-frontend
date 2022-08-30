import React from "react";
import styles from "./Review.module.css";
import "react-alice-carousel/lib/alice-carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import NavBar from "../navigation/NavBar";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ReviewInfo(props) {
  return (
    <>
      <NavBar />
      <div className={styles.responsivewrapper}>
        <img className="back" alt="" src="/img/back.png" />
        <p className={styles.category}>{props.information.gubun}</p>
        <p className={styles.name}>{props.information.name}</p>

        <div className={styles.locationboxflex}>
          <div className={styles.carouselsize}>
            <Swiper
              slidesPerView={2.3}
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
              <SwiperSlide>
                <img
                  className={styles.reviewimgs}
                  alt=""
                  src="/img/reviewinfoimg.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className={styles.reviewimgs}
                  alt=""
                  src="/img/reviewinfoimg.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className={styles.reviewimgs}
                  alt=""
                  src="/img/reviewinfoimg.png"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className={styles.gagerightbox}>
            <p className={styles.gagename}>가게 정보</p>
            <hr />
            <div>
              <div className={styles.locationboxflex}>
                <img
                  className={styles.gageimg}
                  alt=""
                  src="/img/location.png"
                ></img>
                <p className={styles.gageinfoname}>주소</p>
              </div>
              <p className={styles.gageinfocontent}>
                {props.information.address}
              </p>
            </div>
            <div>
              <div className={styles.locationboxflex}>
                <img
                  className={styles.gageimg}
                  alt=""
                  src="/img/call.png"
                ></img>
                <p className={styles.gageinfoname}>전화번호</p>
              </div>
              <p className={styles.gageinfocontent}>
                {props.information.cntct}
              </p>
            </div>
            <div>
              <div className={styles.locationboxflex}>
                <img
                  className={styles.gageimg}
                  alt=""
                  src="/img/time.png"
                ></img>
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
