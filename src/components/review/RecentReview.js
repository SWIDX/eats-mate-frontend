import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Carousel from "../etc/Carousel";
import styles from './RecentReview.module.css';
import { ReactComponent as KakaoMapSvg } from "../../images/svg/recent-review-kakao-map.svg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive"

function RecentReview(){
    const navigate = useNavigate();
    const SERVER = "eats-mate.com:8081"
    const [information, setInformation] = useState(undefined); // 백엔드에서 받아온 정보 객체 리스트
    const [currentInfo, setCurrentInfo] = useState({}); // 버튼 클릭하면 나와야 하는 단일 정보 객체
    const [btnClick, setBtnClick] = useState([]);

    const isPc = useMediaQuery({ query: "(min-width:426px)" });
    const isMobile = useMediaQuery({ query: "(max-width:426px)" });

    useEffect(() => {
        getRecentReview();
        setBtnClick([true, false, false, false, false]);
    }, [])

    async function getRecentReview() {
        let res = await axios.get("http://" + SERVER + "/review-service/review/recent")
        let info = res.data;

        info.forEach((o) => {
            o.image = generateCarouselData(o.image) // 이미지 포맷 전처리
            o.review.forEach((r, i) => (o.review[i].createdBy = r.createdBy.replaceAll('-', '. ')));
        });

        setInformation(info); // 전체 데이터 저장
        setCurrentInfo(info[0]) // 당장 보여줄 데이터 지정
    }

    // Carousel에 맞는 이미지 데이터 객체로 변환
    function generateCarouselData(image) {
        let imgList = [];
        image.forEach((img) => {
            let imgData = {};
            imgData["image"] = img;
            imgData["link"] = img;
            imgList.push(imgData);
        });
        return imgList;
    }

    function handleBtnClick(idx) {
        setCurrentInfo(information[idx]);
        let clickMatrix = [false, false, false, false, false];
        clickMatrix[idx] = true;
        setBtnClick(clickMatrix);
    }
    

    return (
        <>
        <div className={styles.title}>최근에 달린 식당 리뷰를 참고해보세요</div>

        <div className={styles.buttonContainer}>
            <button className={btnClick[0] ? styles.buttonClicked : styles.button} onClick={() => {handleBtnClick(0)}}>강남구</button>
            <button className={btnClick[1] ? styles.buttonClicked : styles.button} onClick={() => {handleBtnClick(1)}}>광진구</button>
            <button className={btnClick[2] ? styles.buttonClicked : styles.button} onClick={() => {handleBtnClick(2)}}>서대문구</button>
            <button className={btnClick[3] ? styles.buttonClicked : styles.button} onClick={() => {handleBtnClick(3)}}>용산구</button>
            <button className={btnClick[4] ? styles.buttonClicked : styles.button} onClick={() => {handleBtnClick(4)}}>마포구</button>
        </div>

        {information &&
        <div className={styles.contentContainer}>
            <div className={styles.carouselContainer}>
            {isPc && <Carousel
                dataList={currentInfo.image}
                outerViewWidth={"600px"}
                outerViewHeight={"380px"}
                imageWidth={"100%"}
                imageHeight={"100%"}
                imageRadius={32}
                gap={0}
                innerViewOverflow={"hidden"}
                buttonSize={50}
                buttonColor={"#8F7BF7"}
                scrollStep={"full"}
                autoScroll={true}
                showBullets={false}
            />
            }
            {isMobile && <Carousel
                dataList={currentInfo.image}
                outerViewWidth={"375px"}
                outerViewHeight={"240px"}
                imageWidth={"100%"}
                imageHeight={"100%"}
                imageRadius={32}
                gap={0}
                innerViewOverflow={"hidden"}
                buttonSize={40}
                buttonColor={"#8F7BF7"}
                scrollStep={"full"}
                autoScroll={true}
                showBullets={false}
            />
            }
            </div>

            <div className={styles.storeInfo} onClick={() => navigate("/detail/" + currentInfo.name)}>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{display: 'flex', marginBottom: '16px'}}>
                            <div className={styles.name}>{currentInfo.name}</div>
                            <div className={styles.border} />
                            <div className={styles.gubun}>{currentInfo.gubun}</div>
                        </div>
                        <div style={{display: 'flex', marginBottom: '8px'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_31_172)">
                            <path d="M11.5455 21C11.4762 21.0001 11.4077 20.9843 11.3451 20.9536C11.2825 20.9229 11.2272 20.878 11.1834 20.8225C10.9262 20.5268 5 13.3801 5 9.77217C5.00252 7.97688 5.69295 6.25591 6.91991 4.98644C8.14688 3.71698 9.81026 3.00261 11.5455 3C13.2798 3.00261 14.9422 3.7173 16.1676 4.98705C17.3931 6.25679 18.0814 7.97779 18.0814 9.77217C18.0814 13.3801 12.1552 20.5268 11.898 20.8225C11.8552 20.8768 11.8015 20.9208 11.7406 20.9514C11.6797 20.982 11.6131 20.9986 11.5455 21ZM11.5455 3.98576C10.0622 3.98576 8.63966 4.59536 7.59082 5.68052C6.54199 6.76568 5.95276 8.23752 5.95276 9.77217C5.95276 12.2859 9.6971 17.4512 11.5455 19.7382C13.3843 17.4512 17.1286 12.2859 17.1286 9.77217C17.1286 8.23923 16.5407 6.76889 15.4939 5.68401C14.4472 4.59913 13.0271 3.98837 11.5455 3.98576V3.98576Z" fill="white"/>
                            <path d="M11.5454 12.4929C10.7873 12.4929 10.0603 12.1813 9.52432 11.6267C8.98829 11.0721 8.68713 10.3199 8.68713 9.53561C8.68713 8.75129 8.98829 7.99907 9.52432 7.44447C10.0603 6.88988 10.7873 6.57832 11.5454 6.57832C12.3035 6.57832 13.0305 6.88988 13.5665 7.44447C14.1026 7.99907 14.4037 8.75129 14.4037 9.53561C14.4037 10.3199 14.1026 11.0721 13.5665 11.6267C13.0305 12.1813 12.3035 12.4929 11.5454 12.4929ZM11.5454 7.63303C11.04 7.63303 10.5554 7.84078 10.198 8.21051C9.84067 8.58024 9.63989 9.08168 9.63989 9.60456C9.63989 10.1274 9.84067 10.629 10.198 10.9987C10.5554 11.3685 11.04 11.5761 11.5454 11.5761C12.0508 11.5761 12.5355 11.3685 12.8928 10.9987C13.2502 10.629 13.4509 10.1274 13.4509 9.60456C13.4509 9.08168 13.2502 8.58024 12.8928 8.21051C12.5355 7.84078 12.0508 7.63303 11.5454 7.63303Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_31_172">
                            <rect width="13.0909" height="18" fill="white" transform="translate(5 3)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <div className={styles.address}>{currentInfo.address}</div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_31_179)">
                            <path d="M11.639 20C10.3259 20 9.04235 19.6106 7.95058 18.8811C6.8588 18.1516 6.00786 17.1147 5.50537 15.9016C5.00288 14.6885 4.8714 13.3536 5.12757 12.0658C5.38374 10.7779 6.01604 9.59498 6.94453 8.6665C7.87301 7.73801 9.05596 7.10572 10.3438 6.84956C11.6316 6.59339 12.9665 6.72486 14.1796 7.22735C15.3928 7.72984 16.4296 8.58078 17.1591 9.67255C17.8886 10.7643 18.278 12.0479 18.278 13.361C18.278 15.1218 17.5786 16.8104 16.3335 18.0555C15.0884 19.3005 13.3998 20 11.639 20ZM11.639 7.82848C10.5448 7.82848 9.47512 8.15296 8.56531 8.76088C7.65549 9.3688 6.94638 10.2328 6.52764 11.2438C6.1089 12.2547 5.99934 13.3671 6.21281 14.4403C6.42629 15.5135 6.9532 16.4993 7.72693 17.2731C8.50067 18.0468 9.48647 18.5737 10.5597 18.7872C11.6329 19.0007 12.7453 18.8911 13.7562 18.4724C14.7671 18.0536 15.6312 17.3445 16.2391 16.4347C16.847 15.5249 17.1715 14.4552 17.1715 13.361C17.1715 11.8937 16.5886 10.4865 15.5511 9.44891C14.5135 8.41136 13.1063 7.82848 11.639 7.82848Z" fill="white"/>
                            <path d="M12.1922 4.50899H11.0857V7.27524H12.1922V4.50899Z" fill="white"/>
                            <path d="M14.9585 4H8.28625V5.1065H14.9585V4Z" fill="white"/>
                            <path d="M14.9585 14.4675H11.0747V10.0415H12.1812V13.361H14.9585V14.4675Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_31_179">
                            <rect width="13.278" height="16" fill="white" transform="translate(5 4)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            <div className={styles.time}>{currentInfo.time}</div>
                        </div>
                    </div>
                    {isPc &&
                    <div style={{marginLeft: '40px'}}> {/* 카카오 아이콘 */}
                        <KakaoMapSvg />
                    </div>
                    }
                    {isMobile &&
                    <div style={{flex: '1'}}> {/* 카카오 아이콘 */}
                        <KakaoMapSvg className={styles.kakaoMobileSvg} />
                    </div>
                    }
                </div>
            </div>
            
            <div className={styles.reviewContainer}>
                {currentInfo.review.map((r,i) => {
                    return (
                    <div className={styles.review}>
                        <div className={styles.content}>{r.content}</div>
                        <div className={styles.createdBy}>{r.createdBy}</div>
                    </div>
                    );
                })
                }
            </div>
        </div>
        }

        </>
    );
    
}

export default RecentReview;
