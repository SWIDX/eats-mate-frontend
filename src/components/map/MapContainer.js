/* global kakao */

import React, { useEffect, useState } from 'react';
import { Map, MapMarker, Circle } from 'react-kakao-maps-sdk';
import axios from 'axios';

import styles from './Map.module.css';

const MapContainer = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.56076811229905, lng: 126.93694098263262 },//37.566767891, 126.978657934
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  });
  //센터 이동은 한번검색에 한번만.
  //첫번째 검색결과에만 해당되도록 bool 인수 할당

  //const [nearbyRest, setNearbyRest] = useState([]);
  const [currentMarker, setCurrentMarker] = useState([]);

  /*
  const onClickMarker = (info) => {
    const url = `http://localhost:8081/map-service/information/findByNearby?lat=${info.lat}&lng=${info.lng}&dist=1.0`;
    axios.get(url).then((res) => {
      setNearbyRest(res.data);
    });
  };*/

  const markerConstructor = (info) => {
    const marker = (
      <MapMarker
        position={{
          lat: info.lat,
          lng: info.lng,
        }}
        image={{
          src: '/img/pin_1x.png', // 마커이미지의 주소입니다
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
      >
        <div>{info.name}</div>
      </MapMarker>
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
    } else if (props.gpsInformation.lat !== 0) { // When the gps value changes
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
          height: '100vh',
        }}
        level={2} // 지도의 확대 레벨
        onCenterChanged={(map) => setState({
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          }
        })}
      >
        {currentMarker.length != 0
          ? currentMarker.map((item) => {
              return item.data;
            })
          : null}
      </Map>
    </>
  );
};

export default MapContainer;
