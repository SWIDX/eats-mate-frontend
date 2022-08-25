/* global kakao */

import React, { useEffect, useState } from "react";
import { Map, MapMarker, Circle, Polyline } from "react-kakao-maps-sdk";
import axios from "axios";

import styles from "./Map.module.css";

const MapContainer = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.56076811229905, lng: 126.93694098263262 }, //37.566767891, 126.978657934
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  });
  //센터 이동은 한번검색에 한번만.
  //첫번째 검색결과에만 해당되도록 bool 인수 할당

  //const [nearbyRest, setNearbyRest] = useState([]);
  const [currentMarker, setCurrentMarker] = useState([]);
  const [information, setInformation] = useState();

  const [courseInfoWindow, setCourseInfoWindow] = useState(false); // course info window

  const [course, setCourse] = useState([]); // 사용자 맞춤 코스로 저장될 정보
  const [drawCourseLine, setDrawCourseLine] = useState(false);
  const [distance, setDistance] = useState();

  useEffect(() => {
    setDrawCourseLine(false);
    setCourse([]); // to redraw course with new point data
    setCourse(props.courseLine);
    setDrawCourseLine(true);
  }, [props.courseLine]);

  const onClickMarker = (info) => {
    setCourseInfoWindow(true);
    setInformation(info);
  };

  useEffect(() => {
    //alert(courseInfoWindow);
  }, [courseInfoWindow]);

  const AddCourse = () => {
    props.propFunction(information);
    setCourseInfoWindow(false);
  };

  /* course distance information
  const DistanceInfo = ({ distance }) => {
    const walkkTime = (distance / 67) | 0
    const bycicleTime = (distance / 227) | 0

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{" "}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{" "}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{" "}
              시간{" "}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </ul>
    )
  } */

  const markerConstructor = (info) => {
    const marker = (
      <MapMarker
        position={{
          lat: info.lat,
          lng: info.lng,
        }}
        image={{
          src: "/img/pin_1x.png", // 마커이미지의 주소입니다
          size: {
            width: 64,
            height: 69,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 27,
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
    if (props.markerInformation !== undefined) {
      props.markerInformation.map((item, idx) => {
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
            data: markerConstructor(item),
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
          width: "100%",
          height: "100vh",
        }}
        level={2} // 지도의 확대 레벨
        onCenterChanged={(map) =>
          setState({
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
          })
        }
      >
        {currentMarker.length != 0
          ? currentMarker.map((item) => {
              return item.data;
            })
          : null}

        {courseInfoWindow && (
          <div className={styles.infoWindow}>
            <img
              alt="close btn"
              width="35"
              height="35"
              src="/img/closeBtn.png"
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
              }}
              onClick={() => setCourseInfoWindow(false)}
            />
            <div className={styles.infoWindowTitle}>
              {information.children[19].value}
            </div>
            <div className={styles.infoWindowAddress}>
              {information.children[0].value}
            </div>
            <div>
              <img
                alt="add course btn"
                src="/img/addCourseBtn.png"
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "120px",
                }}
                onClick={() => AddCourse()}
              />
            </div>
          </div>
        )}

        {drawCourseLine && (
          <Polyline
            path={course.map((info) => ({ lat: info.lat, lng: info.lng }))}
            strokeWeight={3} // 선의 두께 입니다
            strokeColor={"#e97869"} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
          />
        )}
      </Map>
    </>
  );
};

export default MapContainer;
