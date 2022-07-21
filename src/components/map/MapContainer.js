/* global kakao */

import React, { useEffect } from 'react';
import styles from './Map.module.css';
const { kakao } = window;

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566767891, 126.978657934),
      level: 1,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </>
  );
};

export default MapContainer;
