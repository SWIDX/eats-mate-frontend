/* global kakao */

import React, { useState, useEffect } from 'react';

import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import CategoryBtn from '../components/map/CategoryBtn';
import InformationCard from '../components/map/InformationCard';
import ListCard from '../components/map/ListCard';

import styles from './MapPage.module.css';

function MapPage() {
  const [clickInformation, setClickInformation] = useState();
  const [listInformation, setListInformation] = useState();

  const getClickInfo = (info) => {
    setClickInformation(info);
  };

  const getListInfo = (info) => {
    setListInformation(info);
  };

  return (
    <>
      <div>
        <MapSearchBar propFunction={getListInfo} />
        <CategoryBtn />
        {listInformation ? (
          <ListCard
            listInformation={listInformation}
            propFunction={getClickInfo}
          />
        ) : null}
        {clickInformation ? (
          <InformationCard clickInformation={clickInformation} />
        ) : null}
      </div>
      <div className="styles.map">
        <MapContainer
          markerInformation={listInformation}
          clickedInformation={clickInformation}
        />
      </div>
    </>
  );
}

export default MapPage;
