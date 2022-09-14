import React, { useState, useEffect, useContext } from 'react';
import TabMenu from './TabMenu';
import styles from './ListCard.module.css';
import { SearchContext } from '../../context/SearchContext';
import RestInformationCard from './RestInformationCard';
import TourInformationCard from './TourInformationCard';
import { ReactComponent as Exit } from '../../images/svg/exit_button.svg';
import axios from 'axios';

function ListCard(props) {
    const SERVER = "eats-mate.com:8081"
    const [information, setInformation] = useState();
    const [onClose, setOnClose] = useState(true);
    const { searchInformation } = useContext(SearchContext);
    const [courseNum, setCourseNum] = useState();
    const [overlayLatLng, setOverlayLatLng] = useState({lat:null, lng:null, name:null});
    const [onDisplayNone, setOnDisplayNone] = useState(false);
    const [onCloseOverlay, setOnCloseOverlay] = useState(false);

    const mouseOver = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#ccc';
    };
    const mouseLeave = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#fff';
    };

    const getOnClose = (close) => {
        console.log(close);
        setOnClose(close);
    };

    const clickAddCourse = (info) => {
        props.clickAddCourse(info);
    };

    const setClickedInformation = (res) => {
        setInformation(res);
        setOverlayLatLng({lat:res.information.lat, lng:res.information.lng, name:res.information.name});
        //console.log(res);
        //props.getClickInformation(res);
    }; // click information props

    useEffect(() => {
        props.getOverlayLatLng(overlayLatLng);
    }, [overlayLatLng]);

    const onClickItem = async (item) => {
        let data = {};

        if (item.type == '음식점') {
            const url = 'http://' + SERVER_IP + ':8081/map-service/getRestInfo?id=';
            data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
        } else if (item.type == '여행지') {
            const url = 'http://' + SERVER_IP + ':8081/map-service/getTourInfo?id=';
            data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
        }

        if (data) {
            setClickedInformation({
                type: item.type,
                information: data,
            });
        }
    };

    useEffect(() => {
        if(props.markerInformation.information !== null) {
            onClickItem(props.markerInformation);
        } else {}
    }, [props.markerInformation]);

    useEffect(() => {
        if (information != undefined) {
            if (onClose == true) {
                setOnClose(false);
            } else if (props.markerInformation.information !== null) {
                setOnClose(false);
                // 마커가 한 번 클릭된 뒤 다른 마커 클릭 시, 리스트 카드가 상단으로 올라와 인포 카드를 가리는 것을 방지함
            }
            else {
                setOnClose(true);
            }
        }
    }, [information]);

    useEffect(() => {
        if (props.listInformation) {
            setOnClose(true);
            setOnDisplayNone(false);
            setOnCloseOverlay(true); /* list reset, close overlay */
        }
    }, [props.listInformation]);

    useEffect(() => {
        if (props.courseNum !== undefined) {
            setCourseNum(props.courseNum);
        }
    }, [props.courseNum]);

    const checkCourseNum = () => {
        props.checkCourseNum();
    };

    const closeOverlay = (info) => {
        setOnCloseOverlay(info);
    };

    useEffect(() => {
        if(onCloseOverlay == true) {
            props.closeOverlay(onCloseOverlay);
        }
        setOnCloseOverlay(false); // reset data
    }, [onCloseOverlay]);

    return (
        <>
            {onClose ? (
                <div className={onDisplayNone === true ? styles.list_display : styles.list_outer}>
                    <div>
                        <div className={styles.cardTop}>
                            <span className={styles.result_name}>'{searchInformation.text}' 검색결과</span>
                            <span className={styles.result_tag}>{searchInformation.info.length}건</span>
                            <div className={styles.exitbutton}>
                                <button
                                    onClick={() => {
                                        setOnDisplayNone(true);
                                    }}
                                >
                                    <Exit />
                                </button>
                            </div>
                        </div>

                        <div className={styles.tabmenu_outer}>
                            <TabMenu
                                className={styles.tabmenu}
                                selectedType={props.selectedType}
                                information={props.listInformation}
                                setClickedInformation={setClickedInformation}
                            />
                        </div>
                    </div>
                </div>
            ) : information.type === '음식점' ? (
                <>
                    <RestInformationCard
                        clickInformation={information}
                        propFunction={getOnClose}
                        clickAddCourse={clickAddCourse}
                        checkCourseNum={checkCourseNum}
                        courseNum={courseNum}
                        closeOverlay={closeOverlay}
                    />
                </>
            ) : (
                <>
                    <TourInformationCard
                        clickInformation={information}
                        propFunction={getOnClose}
                        clickAddCourse={clickAddCourse}
                        checkCourseNum={checkCourseNum}
                        courseNum={courseNum}
                        closeOverlay={closeOverlay}
                    />
                </>
            )}
        </>
    );
}

export default ListCard;
