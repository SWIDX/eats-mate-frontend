import React from "react";
import styles from "./NoContent.module.css";


function NoContent(){

    return(
        <>
        <div className={styles.all}>
            <div className={styles.main}>PC 환경에서만 제공하고 있는 기능이예요</div>
            <img alt="" src="/img/noneimg2x.png"/>
            <div className={styles.sub}>잇츠메이트의 다양한 기능을 제한없이 이용하기 위해 <span>PC 버전 접속</span>을 권장드려요:)</div>
            <div className={styles.backButton}>
                <div>메인페이지로 돌아가기</div>
                <svg width="34" height="10" viewBox="0 0 34 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                </svg>
            </div>
        </div>
        </>
    )

}

export default NoContent;