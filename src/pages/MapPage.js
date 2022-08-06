/* global kakao */

import React, { useState, useEffect } from 'react';

import NavBar from '../components/navigation/NavBar';
import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import CategoryBtn from '../components/map/CategoryBtn';
import InformationCard from '../components/map/InformationCard';
import ListCard from '../components/map/ListCard';

import styles from './MapPage.module.css';

function MapPage() {
  const [clickInformation, setClickInformation] = useState();
  const [listInformation, setListInformation] = useState();
  const [gpsLoc, setGpsLoc] = useState({
    lat: 0,
    lng: 0,
  });

  const getClickInfo = (info) => {
    setClickInformation(info);
  };
  const getListInfo = (info) => {
    setListInformation(info);
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
        <MapSearchBar propFunction={getListInfo} />
        <CategoryBtn propFunction={getGpsLoc} gpsInformation={gpsLoc} />
      </div>
      <div className="styles.map">
        <MapContainer
          markerInformation={listInformation}
          clickedInformation={clickInformation}
          gpsInformation={gpsLoc}
          propFunction={getClickInfo}
        />
        {clickInformation ? (
          <InformationCard clickInformation={clickInformation} />
        ) : null}
        {listInformation ? (
          <ListCard
            listInformation={listInformation}
            propFunction={getClickInfo}
          />
        ) : null}
      </div>
    </>
  );
}

export default MapPage;
