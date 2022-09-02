import React from "react";
import styles from './Review.module.css';

function RecentReview(){
    return(
        <>
            <div className={styles.recentreview}>
                <p className = {styles.maininfomessage}>최근에 달린 식당 리뷰를 확인해보세요</p>
                    <div className = {styles.locationboxflex}>
                        <div className={styles.locationbox}>강남구</div>
                        <div className={styles.locationbox}>광진구</div>
                        <div className={styles.locationbox}>서대문구</div>
                        <div className={styles.locationbox}>용산구</div>
                        <div className={styles.locationbox}>마포구</div>
                    </div>

                <div className={styles.locationboxflex}>
                    <div>
                        <img className={styles.recentreviewimg} alt="" src="/img/recentreviewimg.png" />
                            <div className={styles.infobox}>
                                <div className = {styles.locationboxflex}>
                                    <div className={styles.infoname}>성수완당 본점</div>
                                    <div className={styles.infocategory}>| 일식 </div>
                                    <img className={styles.kakaolocation} alt="" src="/img/kakaolocation.png"/>
                                </div>
                                <p className={styles.infocontent}>&nbsp;
                                    <img className="locationwhite" alt="" src="/img/locationwhite.png"/> 서울시 광진구 동일로22길 117-14
                                </p>
                                <p className={styles.infocontent}>
                                    <img className="timewhite" alt="" src="/img/timewhite.png"/>매일 11:00 - 21:00
                                </p>
                            </div>
                    </div>

                    <div>
                        <div className={styles.infomessagebox1}>
                            주방 앞에 바 형태로 된 좌석이 있어서 편하게 먹을 수 있어서 좋았어요
                            <p className={styles.infomessageboxuser}>나는야혼밥왕님</p>
                        </div>
                        <div className={styles.infomessagebox2}>
                            주방 앞에 바 형태로 된 좌석이 있어서 편하게 먹을 수 있어서 좋았어요
                            <p className={styles.infomessageboxuser}>나는야혼밥왕님</p>
                        </div>
                        <div className={styles.infomessagebox1}>
                            주방 앞에 바 형태로 된 좌석이 있어서 편하게 먹을 수 있어서 좋았어요
                            <p className={styles.infomessageboxuser}>나는야혼밥왕님</p>
                        </div>


                    </div>

                </div>
            </div>

        </>
    );
}

export default RecentReview;