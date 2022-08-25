import React from 'react';
import styles from './Map.module.css';
import { useSelector } from 'react-redux';

function InformationCard(props) {

  const userinfo = useSelector((state) => state.userReducer.userinfo);

  const clickLikeBtn = () => {
    if(userinfo == null) {
      alert("해당 식당을 찜하려면 먼저 로그인을 해주세요");
      /*
      https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fuser-service%252Fauth%252Fkakao%26through_account%3Dtrue%26client_id%3Dc4a648b170fea0fbd26e61d052e9093b
      */
    } else {
      alert("해당 식당을 찜하였습니다.(회원 정보: "+userinfo.name+"메이트님)");
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div id="search" name="search">
          <div className={styles.cardTop}>
            <div className={styles.cardName}>
              {props.clickInformation.name}{' '}
              <span>{props.clickInformation.gubun}</span>{' '}
            </div>
            {/* <div className={styles.cardTag}>광진구</div>  */}
          </div>
          <hr />
          <div className={styles.cardImg}>
            <img src="/img/emonga.jpeg" alt="first pic" />
            <img src="/img/emonga.jpeg" alt="second pic" />
            <img src="/img/emonga.jpeg" alt="third pic" />
          </div>
          <div className={styles.divSections}></div>
          <div className={styles.cardMiddle}>
            <div className={styles.addressInfo}>
              {' '}
              <img src="/img/address.png" /> 주소
              <div className={styles.addressDetail}>
                {props.clickInformation.address}
              </div>
            </div>
            <hr />
            <div className={styles.timeInfo}>
              {' '}
              <img src="/img/time.png" /> 영업시간
              <div className={styles.timeDetail}>
                {props.clickInformation.usage_of_week_and_time}
              </div>
            </div>
            <hr />
            <div className={styles.callInfo}>
              {' '}
              <img src="/img/call.png" /> 전화번호
              <div className={styles.callDetail}>
                {' '}
                {props.clickInformation.cntct}
              </div>
            </div>
          </div>
          <div className={styles.divSections}></div>
          <div className={styles.cardBottom}>
            <div className={styles.reviews}>
              평가<span>3건</span>
              <div className={styles.more}>더보기</div>
              <div className={styles.totalReviews}>
                <div className={styles.good}>
                  <img src="/img/good.png" />
                  최고예요<span>3</span>
                </div>
                <div className={styles.soso}>
                  <img src="/img/soso.png" />
                  평범해요<span>3</span>
                </div>
                <div className={styles.bad}>
                  <img src="/img/bad.png" />
                  별로예요<span>3</span>
                </div>
              </div>
              <div className={styles.DetailReviews}>
                <div className={styles.profile}>
                  <img src="/img/user1.png" />
                  나는야먹짱
                </div>
                <p>
                  말해뭐해 일단 너무 맛있고요... 혼자 건대 갔다가 들렀는데
                  혼밥하기 딱 좋은 분위기였어요 추천
                </p>
                <div className={styles.date}>2022. 01. 08</div>
                <div className={styles.face}>
                  <img src="/img/good.png" />
                  최고예요
                </div>
              </div>
              <hr />
              <div className={styles.DetailReviews}>
                <div className={styles.profile}>
                  <img src="/img/user2.png" />
                  프로혼밥러
                </div>
                <p>
                  와 여기 나만 알던 맛집인데 잇메에도 올라왔네... 강추드려요
                </p>
                <div className={styles.date}>2022. 01. 08</div>
                <div className={styles.face}>
                  <img src="/img/good.png" />
                  최고예요
                </div>
              </div>
            </div>
            <div className={styles.Buttons}>
              <button className={styles.DetailButton}>상세페이지 보기</button>
              <button className={styles.heart} onClick={() => clickLikeBtn()} >
                {' '}
                <img src="/img/heart.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationCard;
