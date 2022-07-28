/* global kakao */

import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './Map.module.css';

const MapContainer = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.566767891, lng: 126.978657934 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  });
  //센터 이동은 한번검색에 한번만.
  //첫번째 검색결과에만 해당되도록 bool 인수 할당

  const clickInformation = (info) => {
    props.propFunction(info);
  };

  useEffect(() => {
    if (props.markerInformation.length > 0) {
      setState({
        center: {
          lat: props.markerInformation[0].lat,
          lng: props.markerInformation[0].lng,
        },
      });
    }
  }, [props]);

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
      >
        {props.markerInformation.length == 1 ? (
          <MapMarker
            position={{
              lat: props.markerInformation[0].lat,
              lng: props.markerInformation[0].lng,
            }}
            clickable={true}
            onClick={() => clickInformation(props.markerInformation[0])}
          >
            <div>{props.markerInformation[0].name}</div>
          </MapMarker>
        ) : (
          props.markerInformation.map((marker, index) => {
            if (index == 0) {
              return (
                <MapMarker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  clickable={true}
                  onClick={() => clickInformation(marker)}
                >
                  <div
                    style={{
                      background_color: 'white',
                      border: '1px solid #e97869',
                      border_radius: '10px',
                    }}
                  >
                    {marker.name}
                  </div>
                </MapMarker>
              );
            } else {
              return (
                <MapMarker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  clickable={true}
                  onClick={() => clickInformation(marker)}
                />
              );
            }
          })
        )}
      </Map>
    </>
  );
};

export default MapContainer;
