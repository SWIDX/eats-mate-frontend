import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as Copy } from '../../images/svg/copy.svg';
import { ReactComponent as Address_pin } from '../../images/svg/address_pin.svg';
import { ReactComponent as Clip } from '../../images/svg/clip.svg';
import { ReactComponent as Paper } from '../../images/svg/paper.svg';
import { ReactComponent as TourApi } from '../../images/svg/tourapi.svg';
import { ReactComponent as Exit } from '../../images/svg/exit_button.svg';
import { ReactComponent as Back } from '../../images/svg/back.svg';

import styles from './TourInformationCard.module.css';
import useCopyClipBoard from '../etc/useCopyClipBoard';

function TourInformationCard(props) {
    const [onClose, setOnClose] = useState(false);
    const [information, setInformation] = useState({});
    const [type, setType] = useState();
    const [isCopy, onCopy] = useCopyClipBoard();
    const [onDisplayNone, setOnDisplayNone] = useState(false);

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
        <>
            <div className={styles.card_outer}>
                <div className={onDisplayNone === true ? styles.card_display : styles.card}>
                    <div className={styles.topOuter}>
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
                            </div>
                            <div className={styles.exitbutton}>
                                <button
                                    onClick={() => {
                                        setOnDisplayNone(true);
                                    }}
                                >
                                    <Exit />
                                </button>
                            </div>

                            {/* <div className={styles.cardTag}>광진구</div>  */}
                        </div>
                        <div className={styles.cardMiddleOuter}>
                            <hr className={styles.line_hr} />
                            <div className={styles.cardMiddleScroll}>
                                {information.represent_image !== '' ? (
                                    <>
                                        <div className={styles.cardImg}>
                                            <img className={styles.tourImg} src={information.represent_image} />
                                        </div>
                                        <div className={styles.divSections}></div>
                                    </>
                                ) : null}
                                <div>
                                    <div className={styles.cardMiddle}>
                                        <div className={styles.addressInfo}>
                                            <div className={styles.addressTop_tour}>
                                                <div className={styles.top}>
                                                    <Address_pin /> <div>주소</div>
                                                </div>
                                                <div className={styles.bottom}>
                                                    <Copy />
                                                    <button
                                                        className={styles.copyBtn}
                                                        onClick={() => handleCopyClipBoard(information.address)}
                                                    >
                                                        주소복사 {isCopy && alert('복사성공')}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={styles.addressDetail}>{information.address}</div>
                                        </div>
                                        <div className={styles.overviewInfo}>
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
                                                    <button
                                                        className={styles.copyBtn}
                                                        onClick={() => handleCopyClipBoard(information.homepage)}
                                                    >
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
            </div>
        </>
    );
}

export default TourInformationCard;
