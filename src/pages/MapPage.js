/* global kakao */

import React, { useState, useEffect } from "react";

import NavBar from "../components/navigation/NavBar";
import MapContainer from "../components/map/MapContainer";
import MapSearchBar from "../components/map/MapSearchBar";
import MapCourse from "../components/map/MapCourse";
import CategoryBtn from "../components/map/CategoryBtn";
import InformationCard from "../components/map/InformationCard";
import ListCard from "../components/map/ListCard";

import styles from "./MapPage.module.css";

function MapPage() {
  const [clickInformation, setClickInformation] = useState();
  const [listInformation, setListInformation] = useState();
  const [selectedType, setSelectedType] = useState();
  const [listCardOn, setListCardOn] = useState(false);
  const [viewCourseComponent, setViewCourseComponent] = useState(false);
  const [point, setPoint] = useState();
  const [courseLine, setCourseLine] = useState([]);
  const [finalDistance, setFinalDistance] = useState();

  const [gpsLoc, setGpsLoc] = useState({
    lat: 0,
    lng: 0,
  });
  const [onCard, setOnCard] = useState(true);
  const [infoCard, setInfoCard] = useState(false);

  const getClickInfo = (info) => {
    setClickInformation(info);
  };

  const getSearchBarInfo = (item) => {
    if (item !== []) {
      if (item.info.length > 0) {
        setListCardOn(true);
        setListInformation(item.info);
      }
      if (item.value != null) {
        setSelectedType(item.value);
      }
    }
  };

  const clickAddCourse = (info) => {
    setViewCourseComponent(true);
    setPoint(info);
  };

  useEffect(() => {
    /*to set point value directly*/
  }, [point]);

  useEffect(() => {
    if (clickInformation !== undefined) {
      setInfoCard(true);
    }
  }, [clickInformation]);

  const clearCoursePoint = () => {
    setPoint(null);
  };

  const drawCourse = (pointInfo) => {
    setCourseLine([]);
    setCourseLine(pointInfo);
  };

  const closeCourseComponent = () => {
    setViewCourseComponent(false);
    setCourseLine([]);
  };

  const setDistanceFunc = (distance) => {
    setFinalDistance(distance);
  };

  /*const getGpsLoc = (info) => {
    setGpsLoc({
      lat: info.lat,
      lng: info.lng,
    });
  };

  function getUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        //alert(position.coords.latitude+""+position.coords.longitude);
        setGpsLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  useEffect(() => {
    getUserLoc();
  }, []);*/

  return (
    <>
      <div>
        <NavBar />
      </div>
      
      {/*<CategoryBtn propFunction={getGpsLoc} gpsInformation={gpsLoc} />*/}

      <div className="styles.map">
        {listInformation && listCardOn ? (
          <ListCard
            listInformation={listInformation}
            selectedType={selectedType}
            propFunction={getClickInfo}
          />
        ) : null}

        <MapSearchBar propFunction={getSearchBarInfo} />

        {viewCourseComponent ? (
          <MapCourse
            point={point}
            propFunction={clearCoursePoint}
            propFunction2={drawCourse}
            propFunction3={closeCourseComponent}
            propFunction4={setDistanceFunc}
          />
        ) : null}
        <MapContainer
          markerInformation={listInformation}
          clickedInformation={clickInformation}
          courseLine={courseLine}
          distance={finalDistance}
          gpsInformation={gpsLoc}
          propFunction={clickAddCourse}
        />
      </div>
    </>
  );
}

export default MapPage;
