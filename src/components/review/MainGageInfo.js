import React from "react";
import styles from "./MainGageInfo.module.css";
import LikeButton from "../like/LikeButton";
import Carousel from "../etc/Carousel";

function MainGageInfo(props){
    console.log(props)

    const testData = [
        {
          image: "../img/main-carousel/main-carousel-1.png",
          link: "/about"
        },
        {
          image: "../img/main-carousel/main-carousel-2.png",
          link: "/map-service/main"
        },
        {
          image: "../img/slideImg1.png",
          link: "/mypage"
        }
      ];

    return(
        <div style={{marginBottom: "100px"}}>
            <div className={styles.infoContainer}>
                <div style={{width: "730px"}}>
                <Carousel
                    dataList={testData}
                    outerViewWidth={"660px"}
                    outerViewHeight={"400px"}
                    imageWidth={"400px"}
                    imageHeight={"400px"}
                    imageRadius={24}
                    gap={38}
                    innerViewOverflow={"hidden"}
                    buttonSize={50}
                    scrollStep={"one"}
                    autoScroll={true}
                    showBullets={false}
                />
                </div>
                <div className={styles.gageInfo}>
                    <div className={styles.titleContainer}>
                        <div className={styles.gageCircle}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle  cx="11" cy="11" r="11" fill="#E97869"/></svg>
                        </div>
                        <div className={styles.gageInfoContainer}>
                            <span className={styles.gageName}>{props.information.name}</span>
                            <span className={styles.gageGubun}>{props.information.gubun}</span>
                        </div>
                        <div className={styles.likeButton}><LikeButton placeId={props.information.id}/></div>
                    </div>

                    <div className={styles.ImageContainer}>
                        <div className={styles.LargeImageContainer}>
                            <div className={styles.mobileImage1}>
                            <img src={testData[0].image} />
                        </div>
                    </div>
                    <div className={styles.SmallImageContainer}>
                        <div className={styles.mobileImage2}>
                            <img src={testData[1].image} />
                        </div>
                        <div className={styles.mobileImage3}>
                            <img src={testData[2].image} />
                        </div>
                    </div>
                    </div>

                    <div className={styles.gageContentContainer}>
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_845_597)">
                        <path d="M6.54545 18C6.47616 18.0001 6.40772 17.9843 6.3451 17.9536C6.28248 17.9229 6.22725 17.878 6.18341 17.8225C5.92617 17.5268 0 10.3801 0 6.77217C0.00252025 4.97688 0.692946 3.25591 1.91991 1.98644C3.14688 0.716978 4.81026 0.00260755 6.54545 0C8.27976 0.00261192 9.94218 0.717298 11.1676 1.98705C12.3931 3.25679 13.0814 4.97779 13.0814 6.77217C13.0814 10.3801 7.15523 17.5268 6.89798 17.8225C6.85517 17.8768 6.80146 17.9208 6.74059 17.9514C6.67972 17.982 6.61313 17.9986 6.54545 18ZM6.54545 0.985761C5.06218 0.985761 3.63966 1.59536 2.59082 2.68052C1.54199 3.76568 0.952759 5.23752 0.952759 6.77217C0.952759 9.28587 4.6971 14.4512 6.54545 16.7382C8.38428 14.4512 12.1286 9.28587 12.1286 6.77217C12.1286 5.23923 11.5407 3.76889 10.4939 2.68401C9.44715 1.59913 8.02707 0.988373 6.54545 0.985761Z" fill="#8C8C8C"/>
                        <path d="M6.54529 9.49294C5.78723 9.49294 5.06023 9.18138 4.52419 8.62679C3.98816 8.07219 3.68701 7.31997 3.68701 6.53565C3.68701 5.75133 3.98816 4.99912 4.52419 4.44452C5.06023 3.88992 5.78723 3.57837 6.54529 3.57837C7.30335 3.57837 8.03037 3.88992 8.5664 4.44452C9.10243 4.99912 9.40357 5.75133 9.40357 6.53565C9.40357 7.31997 9.10243 8.07219 8.5664 8.62679C8.03037 9.18138 7.30335 9.49294 6.54529 9.49294ZM6.54529 4.63308C6.03991 4.63308 5.55525 4.84082 5.1979 5.21055C4.84054 5.58029 4.63977 6.08172 4.63977 6.6046C4.63977 7.12748 4.84054 7.62904 5.1979 7.99877C5.55525 8.3685 6.03991 8.57613 6.54529 8.57613C7.05066 8.57613 7.53534 8.3685 7.89269 7.99877C8.25005 7.62904 8.45081 7.12748 8.45081 6.6046C8.45081 6.08172 8.25005 5.58029 7.89269 5.21055C7.53534 4.84082 7.05066 4.63308 6.54529 4.63308Z" fill="#8C8C8C"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_845_597">
                        <rect width="13.0909" height="18" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <div className={styles.gageContent}>  
                            <div className={styles.gageContentTitle}>주소</div>
                            <div>{props.information.address}</div>
                        </div>  
                    </div>

                    <div className={styles.gageContentContainer}>
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_845_587)">
                        <path d="M6.63901 16C5.32594 16 4.04235 15.6107 2.95058 14.8812C1.8588 14.1517 1.00786 13.1148 0.50537 11.9017C0.00287972 10.6886 -0.128599 9.35367 0.127568 8.06583C0.383736 6.77799 1.01604 5.59504 1.94453 4.66656C2.87301 3.73807 4.05596 3.10578 5.3438 2.84962C6.63164 2.59345 7.96652 2.72492 9.17964 3.22741C10.3928 3.7299 11.4296 4.58084 12.1591 5.67261C12.8886 6.76439 13.278 8.04798 13.278 9.36105C13.278 11.1218 12.5786 12.8105 11.3335 14.0555C10.0884 15.3006 8.39978 16 6.63901 16ZM6.63901 3.82854C5.54478 3.82854 4.47512 4.15302 3.56531 4.76094C2.65549 5.36886 1.94638 6.23291 1.52764 7.24384C1.1089 8.25478 0.99934 9.36718 1.21281 10.4404C1.42629 11.5136 1.9532 12.4994 2.72693 13.2731C3.50067 14.0469 4.48647 14.5738 5.55967 14.7872C6.63287 15.0007 7.74527 14.8912 8.7562 14.4724C9.76713 14.0537 10.6312 13.3446 11.2391 12.4347C11.847 11.5249 12.1715 10.4553 12.1715 9.36105C12.1715 7.89373 11.5886 6.48652 10.5511 5.44897C9.51354 4.41143 8.10632 3.82854 6.63901 3.82854Z" fill="#8C8C8C"/>
                        <path d="M7.19244 0.509033H6.08594V3.27529H7.19244V0.509033Z" fill="#8C8C8C"/>
                        <path d="M9.95833 0H3.28613V1.1065H9.95833V0Z" fill="#8C8C8C"/>
                        <path d="M9.95852 10.4675H6.07471V6.0415H7.18121V9.36101H9.95852V10.4675Z" fill="#8C8C8C"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_845_587">
                        <rect width="13.278" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <div className={styles.gageContent}>
                            <div className={styles.gageContentTitle}>영업시간</div>
                            <div>{props.information.usage_of_week_and_time}</div>
                        </div>           
                    </div>

                    <div className={styles.gageContentContainer}>
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.95543 0.425698L3.05363 0.0923508C3.55354 -0.0596395 4.09126 -0.0230992 4.5664 0.195151C5.04154 0.4134 5.42163 0.798443 5.63572 1.2784L6.31912 2.81046C6.50326 3.22319 6.55456 3.68366 6.46581 4.12726C6.37706 4.57086 6.15272 4.97533 5.82427 5.2839L4.63014 6.40595C4.61538 6.41984 4.60328 6.43633 4.59442 6.45462C4.46938 6.71196 4.65925 7.39932 5.254 8.43803C5.92482 9.60875 6.44283 10.0714 6.68298 10.0001L8.25023 9.51674C8.67944 9.38466 9.13891 9.39123 9.56423 9.53554C9.98955 9.67985 10.3594 9.95465 10.6219 10.3214L11.5931 11.6768C11.898 12.1024 12.0393 12.6251 11.9906 13.1477C11.9419 13.6703 11.7066 14.1573 11.3285 14.5183L10.4929 15.315C10.2024 15.5923 9.84954 15.7947 9.46455 15.9049C9.07955 16.0151 8.67382 16.0298 8.28198 15.9477C5.95526 15.4597 3.87066 13.5716 2.01034 10.3248C0.149358 7.07598 -0.430836 4.30919 0.316733 2.03377C0.441872 1.65282 0.656164 1.30783 0.941501 1.02793C1.22684 0.748043 1.57484 0.54148 1.95609 0.425698H1.95543ZM2.24255 1.38307C2.01379 1.45251 1.80497 1.57642 1.63375 1.74433C1.46252 1.91224 1.33392 2.11922 1.2588 2.34778C0.614438 4.30853 1.13641 6.7993 2.86971 9.82476C4.60169 12.8482 6.47922 14.5483 8.48376 14.9683C8.71898 15.0176 8.96254 15.0088 9.19364 14.9426C9.42474 14.8764 9.63651 14.7549 9.81086 14.5883L10.6458 13.7923C10.8495 13.5979 10.9762 13.3357 11.0025 13.0543C11.0288 12.7729 10.9528 12.4914 10.7887 12.2622L9.81748 10.9061C9.67613 10.7087 9.47703 10.5607 9.24806 10.483C9.01909 10.4053 8.77174 10.4017 8.54066 10.4728L6.96944 10.9575C6.10014 11.2181 5.28244 10.4881 4.39462 8.93739C3.64242 7.62533 3.38177 6.67729 3.70329 6.01526C3.76547 5.88726 3.85015 5.77192 3.95336 5.67458L5.14748 4.55254C5.32441 4.38638 5.44527 4.16857 5.49309 3.92966C5.5409 3.69076 5.51328 3.44276 5.4141 3.22048L4.7307 1.68908C4.61542 1.43058 4.41072 1.2232 4.15482 1.10566C3.89892 0.98813 3.60931 0.968483 3.34009 1.05039L2.24189 1.38374L2.24255 1.38307Z" fill="#8C8C8C"/>
                        </svg>
                        <div className={styles.gageContent}>
                            <div className={styles.gageContentTitle}>전화번호</div>
                            <div>{props.information.cntct}</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default MainGageInfo;