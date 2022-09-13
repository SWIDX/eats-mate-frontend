/* global kakao */

import React, { useEffect, useState, useContext } from 'react';
import { Map, MapMarker, Circle, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MarkerContext } from '../../context/MarkerContext';
import styles from './Map.module.css';

const MapContainer = (props) => {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.56530579495912, lng: 126.977418939994 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: true,
    });
    //센터 이동은 한번검색에 한번만.
    //첫번째 검색결과에만 해당되도록 bool 인수 할당

    //const [nearbyRest, setNearbyRest] = useState([]);
    const [currentMarker, setCurrentMarker] = useState([]);
    const [clickMarkerInformation, setClickMarkerInformation] = useState(null);
    const [course, setCourse] = useState([]); // 사용자 맞춤 코스로 저장될 정보
    const [drawCourseLine, setDrawCourseLine] = useState(false);
    const markerInformation = useContext(MarkerContext);
    const [level, setLevel] = useState(2);
    const [radius, setRadius] = useState(5);
    const [customOverlayOpen, setCustomOverlayOpen] = useState(false);
    const [overlayLatLng, setOverlayLatLng] = useState({lat:null, lng:null, name:null});
    const [onCloseOverlay, setOnCloseOverlay] = useState(false);

    useEffect(() => {
        setDrawCourseLine(false);
        setCourse([]); // to redraw course with new point data
        setCourse(props.courseLine);
        setDrawCourseLine(true);
    }, [props.courseLine]);


    const onClickMarker = (info) => {
        setClickMarkerInformation(info);
        setOverlayLatLng({lat:info.lat, lng:info.lng, name:info.name});
    };

    useEffect(() => {
        props.clickMarker(clickMarkerInformation);
        setClickMarkerInformation(null);
    }, [clickMarkerInformation]);

    const clearClickMarker = () => {
        setClickMarkerInformation(null);
    } // function to reset click marker data

    useEffect(() => {
        if(props.overlayLatLng.lat !== null) {
            setOverlayLatLng({lat:props.overlayLatLng.lat, lng:props.overlayLatLng.lng, name:props.overlayLatLng.name});
        }
    }, [props.overlayLatLng]);

    useEffect(() => {
        if(overlayLatLng.lat !== null) {
            setCustomOverlayOpen(true);
        }
    }, [overlayLatLng]);

    useEffect(() => {
        if(props.onCloseOverlay == true) {
            setCustomOverlayOpen(false);
        }
    }, [props.onCloseOverlay]);

    /* to set circle radius with map level */
    useEffect(() => {
        switch (level) {
            case 1:
                setRadius(3);
                break;
            case 2:
                setRadius(5);
                break;
            case 3:
                setRadius(10);
                break;
            case 4:
                setRadius(15);
                break;
            case 5:
                setRadius(30);
                break;
            case 6:
                setRadius(80);
                break;
            case 7:
                setRadius(100);
                break;
            case 8:
                setRadius(160);
                break;
            default:
                setRadius(160);
                break;
          }
    }, [level]);

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
                            x: 32,
                            y: 69,
                        }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                }}
                opacity={1}
                clickable={true}
                onClick={() => onClickMarker(info)}
                onMouseOver={(marker) => marker.setOpacity(0.5)}
                onMouseOut={(marker) => marker.setOpacity(1)}
            >
            </MapMarker>
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
                onZoomChanged={(map) => setLevel(map.getLevel())}
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
                            radius={radius}
                            strokeWeight={3} // 선의 두께입니다
                            strokeColor={"#000000"} // 선의 색깔
                            strokeOpacity={1} // 선의 불투명도
                            strokeStyle={"solid"} // dash
                            fillColor={"#e97869"} // 채우기 색깔
                            fillOpacity={1} // 채우기 불투명
                    />
                    ))}

                {customOverlayOpen === true ?
                    <CustomOverlayMap
                        position={{
                            lat:overlayLatLng.lat,
                            lng:overlayLatLng.lng
                        }}>
                        <div>
                            <div className={styles.customOverlay}>
                                {overlayLatLng.name}
                            </div>
                        </div>
                    </CustomOverlayMap>
                : null}

            </Map>
        </>
    );
};

export default MapContainer;
