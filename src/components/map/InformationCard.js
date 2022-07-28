import React from 'react';
import styles from './Map.module.css';

function InformationCard(props) {
  return (
    <>
      <div className={styles.card}>
        <div id="search" name="search">
          <div className={styles.cardTop}>
            <div className={styles.cardName}>{props.clickInformation.name}</div>
            <div className={styles.cardTag}>{props.clickInformation.gubun}</div>
          </div>
          <hr />
          <div className={styles.cardImg}>
            <img src="/img/emonga.jpeg" alt="first pic" />
            <img src="/img/emonga.jpeg" alt="second pic" />
            <img src="/img/emonga.jpeg" alt="third pic" />
          </div>
          <hr />
          <div className={styles.cardMiddle}>
            <div>
              주소
              <div>{props.clickInformation.name}</div>
            </div>
            <hr />
            <div>
              영업시간
              <div>{props.clickInformation.usage_of_week_and_time}</div>
            </div>
            <hr />
            <div>
              전화번호
              <div>{props.clickInformation.cntct}</div>
            </div>
            <hr />
          </div>
          <div className={styles.cardBottom}>
            <div>리뷰창</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InformationCard;
