/* global kakao */

import React, { useState } from 'react';

import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import CategoryBtn from '../components/map/CategoryBtn';

import styles from './MapPage.module.css';
import InformationCard from '../components/map/InformationCard';

function MapPage() {
  const [information, setInformation] = useState([]);
  const [clickInformation, setClickInformation] = useState();

  const getLocInfo = (info) => {
    setInformation(info);
  };
  const getClickInfo = (info) => {
    setClickInformation(info);
  };

  return (
    <>
      <div>
        <MapSearchBar propFunction={getLocInfo} />
        <CategoryBtn />
        {clickInformation ? (
          <InformationCard clickInformation={clickInformation} />
        ) : null}
      </div>
      <div className="styles.map">
        <MapContainer
          markerInformation={information}
          propFunction={getClickInfo}
        />
      </div>
    </>
  );
}

export default MapPage;
