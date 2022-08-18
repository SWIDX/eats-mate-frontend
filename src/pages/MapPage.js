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
  const [listCardOn, setListCardOn] = useState(false);
  const [gpsLoc, setGpsLoc] = useState({
    lat: 0,
    lng: 0,
  });

  const getClickInfo = (info) => {
    setListCardOn(false);
    setClickInformation(info);
  };

  const getListInfo = (info) => {
    setListCardOn(true);
    setListInformation(info);
  };

  return (
    <>
      <div>
        <MapSearchBar propFunction={getListInfo} />
      </div>
      {/*<CategoryBtn propFunction={getGpsLoc} gpsInformation={gpsLoc} />*/}

      <div className="styles.map">
        {listInformation && listCardOn ? (
          <ListCard
            listInformation={listInformation}
            propFunction={getClickInfo}
          />
        ) : null}
        {clickInformation && !listCardOn ? (
          <InformationCard clickInformation={clickInformation} />
        ) : null}
        <MapContainer
          markerInformation={listInformation}
          clickedInformation={clickInformation}
        />
      </div>
    </>
  );
}

export default MapPage;
