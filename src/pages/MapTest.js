/* global kakao */

import React, { useState } from 'react';

import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import CategoryBtn from '../components/map/CategoryBtn';

import styles from './MapTest.module.css';

function MapTest() {
  return (
    <>
      <div>
        <MapSearchBar />
        <CategoryBtn />
      </div>
      <div className="styles.map">
        <MapContainer />
      </div>
    </>
  );
}

export default MapTest;
