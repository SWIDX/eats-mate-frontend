import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as Copy } from '../../images/svg/copy.svg';
import { ReactComponent as Address_pin } from '../../images/svg/address_pin.svg';
import { ReactComponent as Phone } from '../../images/svg/call.svg';
import { ReactComponent as Clock } from '../../images/svg/time.svg';
import { ReactComponent as Clip } from '../../images/svg/clip.svg';
import { ReactComponent as Paper } from '../../images/svg/paper.svg';
import { ReactComponent as TourApi } from '../../images/svg/tourapi.svg';
import { ReactComponent as Exit } from '../../images/svg/exit_button.svg';

import styles from './InformationCard.module.css';
import useCopyClipBoard from '../etc/useCopyClipBoard';
import LikeButton from '../like/LikeButton';

function InformationCard(props) {
    const [onClose, setOnClose] = useState(false);
    const [information, setInformation] = useState({});
    const [type, setType] = useState();
    const [isCopy, onCopy] = useCopyClipBoard();

    const handleCopyClipBoard = (text) => {
        onCopy(text);
    };

    const navigate = useNavigate();

    useEffect(() => {
        props.propFunction(onClose);
    }, [onClose]);

    useEffect(() => {
        setInformation(props.clickInformation.information);
        setType(props.clickInformation.type);
    }, [props.clickInformation]);

    useEffect(() => {
        console.log(information);
        //여행지/음식점 나누는 param
    }, [type]);

    const AddCourse = () => {
        props.checkCourseNum();
        if (props.courseNum !== undefined && props.courseNum == 5) {
            alert('코스 경유지는 최대 5개까지만 추가할 수 있습니다.');
        } else {
            props.clickAddCourse(props.clickInformation);
        }
    };

    const infoCard = (gubun) => {
        if (gubun === '음식점') {
            return (
                <div className={styles.card_outer}>
                    <div className={styles.card}>
                        <div className={styles.topOuter}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardTagOuter}>
                                    <span className={styles.cardName}>{information.name}</span>

                                    <div>
                                        <span className={styles.cardTag}>{information.gubun}</span>
                                    </div>
                                </div>
                                <button className={styles.heart}>
                                    <LikeButton />
                                </button>
                                <div className={styles.exitbutton}>
                                    <button
                                        onClick={() => {
                                            setOnClose(true);
                                        }}
                                    >
                                        <Exit />
                                    </button>
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
                                    <div className={styles.addressTop}>
                                        <div className={styles.top}>
                                            <Address_pin /> <div>주소</div>
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
                                            <Clock /> 영업시간
                                        </div>
                                    </div>

                                    <div className={styles.addressDetail}>{information.usage_of_week_and_time}</div>
                                </div>
                                <hr />

                                <div className={styles.addressInfo}>
                                    <div className={styles.addressTop}>
                                        <div className={styles.top}>
                                            <Phone />
                                            전화번호
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
                                            <span className={styles.reviewcount}>3건</span>
                                        </div>
                                        <div className={styles.more}>
                                            <button className={styles.morebtn}>더보기 {'>'} </button>
                                        </div>
                                    </li>

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
                                        <p>말해뭐해 일단 너무 맛있고요... 혼자 건대 갔다가 들렀는데 혼밥하기 딱 좋은 분위기였어요 추천</p>
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
                                        <p>와 여기 나만 알던 맛집인데 잇메에도 올라왔네... 강추드려요</p>
                                        <div className={styles.date}>2022. 01. 08</div>
                                        <div className={styles.face}>
                                            <img src="/img/good.png" />
                                            최고예요
                                        </div>
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
        } else {
            return (
                <div className={styles.card_outer}>
                    <div className={styles.card}>
                        <div className={styles.topOuter}>
                            <div className={styles.cardTop_tour}>
                                <div className={styles.cardTagOuter}>
                                    <span className={styles.cardName}>{information.name}</span>
                                </div>
                                <div className={styles.exitbutton_tour}>
                                    <button
                                        onClick={() => {
                                            setOnClose(true);
                                        }}
                                    >
                                        <Exit />
                                    </button>
                                </div>

                                {/* <div className={styles.cardTag}>광진구</div>  */}
                            </div>

                            <hr />

                            <div className={styles.cardImg_tour}>
                                <img className={styles.tourImg} src={information.represent_image} />
                            </div>

                            <div className={styles.divSections}></div>

                            <div className={styles.cardMiddle_tour}>
                                <div className={styles.addressInfo}>
                                    <div className={styles.addressTop_tour}>
                                        <div className={styles.top}>
                                            <Address_pin /> <div>주소</div>
                                        </div>
                                        <div className={styles.bottom}>
                                            <Copy />
                                            <button className={styles.copyBtn} onClick={() => handleCopyClipBoard(information.address)}>
                                                주소복사 {isCopy && alert('복사성공')}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.addressDetail}>{information.address}</div>
                                </div>
                                <div className={styles.tour_overviewInfo}>
                                    <div className={styles.overview_top}>
                                        <Paper className={styles.copy} /> <div className={styles.overview_name}>장소소개</div>
                                    </div>
                                    <div className={styles.overviewDetail}>
                                        {information.overview == undefined ? (
                                            '세부 정보가 없습니다'
                                        ) : (
                                            <div
                                                className={styles.overviewDetail2}
                                                dangerouslySetInnerHTML={{ __html: information.overview }}
                                            ></div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.addressInfo}>
                                    <div className={styles.addressTop_tour}>
                                        <div className={styles.top}>
                                            <Clip className={styles.copy} /> <div className={styles.overview_name}>홈페이지</div>
                                        </div>
                                        <div className={styles.bottom_2}>
                                            <Copy />
                                            <button className={styles.copyBtn} onClick={() => handleCopyClipBoard(information.homepage)}>
                                                링크복사{isCopy && alert('복사성공')}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.overviewDetail}>
                                        {information.homepage == undefined ? '홈페이지 정보가 없습니다' : information.homepage}
                                    </div>
                                </div>
                                <div className={styles.tourapi_outer}>
                                    <div>
                                        <TourApi className={styles.tourapi} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.Buttons}>
                                <button className={styles.AddCourseBtn} onClick={() => AddCourse()}>
                                    나의 코스에 추가하기
                                </button>
                                {/*<img alt="add course btn" src="/img/addCourseBtn.png" height="50px" onClick={() => AddCourse()} />*/}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <>{infoCard(type)}</>;
}

export default InformationCard;
