/* global kakao */

import React, { useEffect, useState, useContext } from 'react';
import { Map, MapMarker, Circle, Polyline } from 'react-kakao-maps-sdk';
import { MarkerContext } from '../../context/MarkerContext';
import styles from './Map.module.css';

const MapContainer = (props) => {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.56076811229905, lng: 126.93694098263262 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: true,
    });
    //센터 이동은 한번검색에 한번만.
    //첫번째 검색결과에만 해당되도록 bool 인수 할당

    //const [nearbyRest, setNearbyRest] = useState([]);
    const [currentMarker, setCurrentMarker] = useState([]);
    const [information, setInformation] = useState();
    const [course, setCourse] = useState([]); // 사용자 맞춤 코스로 저장될 정보
    const [drawCourseLine, setDrawCourseLine] = useState(false);
    const markerInformation = useContext(MarkerContext);

    useEffect(() => {
        setDrawCourseLine(false);
        setCourse([]); // to redraw course with new point data
        setCourse(props.courseLine);
        setDrawCourseLine(true);
    }, [props.courseLine]);

    const onClickMarker = (info) => {
        alert("마커 클릭 이벤트 코드 작업 중");
        //props.clickMarker(info);
    };

    const markerConstructor = (info, imgSrc) => {
        const marker = (
            <MapMarker
                position={{
                    lat: info.lat,
                    lng: info.lng,
                }}
                image={{
                    src: imgSrc, // 마커이미지의 주소입니다
                    size: {
                        width: 64,
                        height: 69,
                    }, // 마커이미지의 크기입니다
                    options: {
                        offset: {
                            x: 30,
                            y: 69,
                        }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                }}
                clickable={true}
                onClick={() => onClickMarker(info)}
            ></MapMarker>
        );
        return marker;
    };

    useEffect(() => {
        setCurrentMarker([]);
        const data = markerInformation.markerInformation.marker;
        if (data !== undefined) {
            data.map((item, idx) => {
                var imgSrc = '/img/map-marker/' + (item.type == '음식점' ? 'pin_fork' : 'pin_tour') + '.svg';
                if (idx == 0) {
                    setState({
                        center: {
                            lat: item.lat,
                            lng: item.lng,
                        },
                    });
                }
                setCurrentMarker((arr) => [
                    ...arr,
                    {
                        id: item.id,
                        data: markerConstructor(item, imgSrc),
                    },
                ]);
            });
        } else if (props.gpsInformation.lat !== 0) {
            // When the gps value changes
            setState({
                center: {
                    lat: props.gpsInformation.lat,
                    lng: props.gpsInformation.lng,
                },
                isPanto: true,
            });
        }
        //console.log(markerInformation.markerInformation);
    }, [markerInformation]);

    useEffect(() => {
        setCurrentMarker([]);
        if (props.markerInformation !== undefined) {
            props.markerInformation.map((item, idx) => {
                var imgSrc = '/img/map-marker/' + (item.type == '음식점' ? 'pin_fork' : 'pin_tour') + '.svg';
                if (idx == 0) {
                    setState({
                        center: {
                            lat: item.lat,
                            lng: item.lng,
                        },
                    });
                }
                setCurrentMarker((arr) => [
                    ...arr,
                    {
                        id: item.id,
                        data: markerConstructor(item, imgSrc),
                    },
                ]);
            });
        } else if (props.gpsInformation.lat !== 0) {
            // When the gps value changes
            setState({
                center: {
                    lat: props.gpsInformation.lat,
                    lng: props.gpsInformation.lng,
                },
                isPanto: true,
            });
        }
    }, [props.markerInformation]);

    return (
        <>
            <Map // 지도를 표시할 Container
                center={state.center}
                isPanto={state.isPanto}
                style={{
                    // 지도의 크기
                    width: '100%',
                    height: 'calc(100vh - 75px)',
                }}
                level={2} // 지도의 확대 레벨
                /*onCenterChanged={(map) =>
                    setState({
                        center: {
                            lat: map.getCenter().getLat(),
                            lng: map.getCenter().getLng(),
                        },
                    })
                }*/
            >
                {currentMarker.length != 0
                    ? currentMarker.map((item) => {
                          return item.data;
                      })
                    : null}

                {drawCourseLine && (
                    <Polyline
                        path={course.map((info) => ({ lat: info.lat, lng: info.lng }))}
                        draggable={false}
                        strokeWeight={4} // 선의 두께 입니다
                        strokeColor={'#e97869'} // 선의 색깔입니다
                        strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle={'solid'} // 선의 스타일입니다
                    />
                )}

                    {course.map((info) => (
                        <Circle
                            center={{
                            lat: info.lat,
                            lng: info.lng,
                            }}
                            radius={20}
                            strokeWeight={3} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔
                            strokeOpacity={1} // 선의 불투명도
                            strokeStyle={"solid"} // dash
                            fillColor={"#e97869"} // 채우기 색깔
                            fillOpacity={1} // 채우기 불투명
                    />
                    ))}

            </Map>
        </>
    );
};

export default MapContainer;
