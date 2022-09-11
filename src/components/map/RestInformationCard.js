import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as Copy } from '../../images/svg/copy.svg';
import { ReactComponent as Address_pin } from '../../images/svg/address_pin.svg';
import { ReactComponent as Phone } from '../../images/svg/call.svg';
import { ReactComponent as Clock } from '../../images/svg/time.svg';
import { ReactComponent as Exit } from '../../images/svg/exit_button.svg';
import { ReactComponent as Back } from '../../images/svg/back.svg';

import styles from './RestInformationCard.module.css';
import useCopyClipBoard from '../etc/useCopyClipBoard';
import LikeButton from '../like/LikeButton';
import ReviewCounter from "../review/ReviewCounter";

import axios from 'axios';
import Review from '../mypage/Review';

function RestInformationCard(props) {
    const navigate = useNavigate();
    const [onClose, setOnClose] = useState(false);
    const [information, setInformation] = useState({});
    const [type, setType] = useState();
    const [isCopy, onCopy] = useCopyClipBoard();
    const [onDisplayNone, setOnDisplayNone] = useState(false);

    // 리뷰
    const [reviewList, setReviewList] = useState([]);
    const [rateList, setRateList] = useState([0, 0, 0]);

    async function getReviewRate() {
        try {
        const res = await axios.get("http://localhost:8081/review-service/review/count?place_name=" + information.name);
        setRateList(res.data);
        } catch(e){
        throw e;
        }
    }

    async function getUserReview() {
        try {
            const res = await axios.get("http://localhost:8081/review-service/review/?place_name=" + information.name + "&amount=" + 2,
            );
            res.data.forEach((e, i) => res.data[i].createdBy = e.createdBy.replaceAll("-", ". "));
            setReviewList(res.data);
        } catch(e){
            throw e;
        }
    }

    useEffect(() => {
        getUserReview();
        getReviewRate();
    }, [information]);
    // end of 리뷰

    const handleCopyClipBoard = (text) => {
        onCopy(text);
    };

    useEffect(() => {
        props.propFunction(onClose);
    }, [onClose]);

    useEffect(() => {
        setInformation(props.clickInformation.information);
        setType(props.clickInformation.type);
    }, [props.clickInformation]);

    const AddCourse = () => {
        props.checkCourseNum();
        if (props.courseNum !== undefined && props.courseNum == 5) {
            alert('코스 경유지는 최대 5개까지만 추가할 수 있습니다.');
        } else {
            props.clickAddCourse(props.clickInformation);
        }
    };

    return (
        <div className={styles.card_outer}>
            <div className={onDisplayNone === true ? styles.card_display : styles.card}>
                <div className={styles.topOuter}>
                    <div className={styles.exitbutton}>
                        <button
                            onClick={() => {
                                setOnDisplayNone(true);
                            }}
                        >
                            <Exit />
                        </button>
                    </div>
                    <div className={styles.cardTop}>
                        <div className={styles.backBtn}>
                            <button
                                onClick={() => {
                                    setOnClose(true);
                                }}
                            >
                                <Back />
                            </button>
                        </div>
                        <div className={styles.cardTagOuter}>
                            <span className={styles.cardName}>{information.name}</span>

                            <div>
                                <span className={styles.cardTag}>{information.gubun}</span>
                            </div>
                        </div>
                        <button className={styles.heart}>
                            <LikeButton placeId={information.id} />
                        </button>

                        {/* <div className={styles.cardTag}>광진구</div>  */}
                    </div>

                    <div className={styles.cardImg}>
                        <img src="/img/emonga.jpeg" alt="first pic" />
                        <img src="/img/emonga.jpeg" alt="second pic" />
                        <img src="/img/emonga.jpeg" alt="third pic" />
                    </div>

                    <div className={styles.divSections}></div>

                    <div className={styles.cardMiddle}>
                        <div className={styles.addressInfo}>
                            <div className={styles.addressTop}>
                                <div className={styles.top}>
                                    <Address_pin />
                                    <div>주소</div>
                                </div>
                                <div className={styles.bottom}>
                                    <Copy />
                                    <button className={styles.copyBtn} onClick={() => handleCopyClipBoard(information.address)}>
                                        주소복사
                                    </button>
                                </div>
                            </div>

                            <div className={styles.addressDetail}>{information.address}</div>
                        </div>
                        <hr />
                        <div className={styles.addressInfo}>
                            <div className={styles.addressTop}>
                                <div className={styles.top}>
                                    <Clock />
                                    <div>영업시간</div>
                                </div>
                            </div>

                            <div className={styles.addressDetail}>{information.usage_of_week_and_time}</div>
                        </div>
                        <hr />

                        <div className={styles.addressInfo}>
                            <div className={styles.addressTop}>
                                <div className={styles.top}>
                                    <Phone />
                                    <div>전화번호</div>
                                </div>
                            </div>

                            <div className={styles.addressDetail}>{information.cntct}</div>
                        </div>

                        <div />

                        <div className={styles.divSections}></div>
                        <div className={styles.reviews}>
                            <li className={styles.moreTab}>
                                <div className={styles.evaluate_outer}>
                                    <span className={styles.evaluate}>평가</span>
                                    <span className={styles.reviewcount}>{reviewList.length}건</span>
                                </div>
                                <div className={styles.more}>
                                    <button className={styles.morebtn} onClick={() => {navigate("/detail/" + information.name)}}>더보기 {'>'}</button>
                                </div>
                            </li>

                            <div className={styles.totalReviews}>
                                <ReviewCounter
                                    rateVal={rateList}
                                />
                            </div>
                            <div className={styles.DetailReviews}>
                            {reviewList.map((o, i) =>
                                <Review
                                    review={o}
                                    mypageMode={false}
                                    mappageMode={true}
                                />
                            )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.Buttons}>
                        <button className={styles.AddCourseBtn} onClick={() => AddCourse()}>
                            나의 코스에 추가하기
                        </button>
                        {/*<img alt="add course btn" src="/img/addCourseBtn.png" height="50px" onClick={() => AddCourse()} />*/}

                        <button
                            className={styles.DetailButton}
                            onClick={() => {
                                navigate(`/detail/${information.name}`, {
                                    state: information,
                                });
                            }}
                        >
                            상세페이지 보기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestInformationCard;