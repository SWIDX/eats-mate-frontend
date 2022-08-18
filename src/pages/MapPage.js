/* global kakao */

import React, { useState, useEffect } from 'react';

import NavBar from '../components/navigation/NavBar';
import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import CategoryBtn from '../components/map/CategoryBtn';

import styles from './MapPage.module.css';
import InformationCard from '../components/map/InformationCard';

function MapPage() {
  const [information, setInformation] = useState([]);
  const [clickInformation, setClickInformation] = useState();
  const [gpsLoc, setGpsLoc] = useState({
    lat: 0,
    lng: 0,
  });

  const getLocInfo = (info) => {
    setInformation(info);
  };
  const getClickInfo = (info) => {
    setClickInformation(info);
  };

  const getGpsLoc = (info) => {
    setGpsLoc({
      lat: info.lat,
      lng: info.lng,
    });
  };

  function getUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          //alert(position.coords.latitude+""+position.coords.longitude);
          setGpsLoc({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  useEffect(() => {
    getUserLoc();
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <MapSearchBar propFunction={getLocInfo} />
        <CategoryBtn propFunction={getGpsLoc} gpsInformation={gpsLoc} />
        {clickInformation ? (
          <InformationCard clickInformation={clickInformation} />
        ) : null}
      </div>
      <div className="styles.map">
        <MapContainer
          markerInformation={information}
          gpsInformation={gpsLoc}
          propFunction={getClickInfo}
        />
      </div>
    </>
  );
}

export default MapPage;
