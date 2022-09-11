/* global kakao */

import React, { useState, useEffect, useContext } from 'react';

import NavBar from '../components/navigation/NavBar';
import MapContainer from '../components/map/MapContainer';
import MapSearchBar from '../components/map/MapSearchBar';
import MapCourse from '../components/map/MapCourse';
import CategoryBtn from '../components/map/CategoryBtn';
import ListCard from '../components/map/ListCard';

import styles from './MapPage.module.css';
import { SearchContext } from '../context/SearchContext';
import { MarkerContext } from '../context/MarkerContext';
import { useMediaQuery } from "react-responsive"
import MobileNavBar from "../components/navigation/mobile/MobileNavBar";

function MapPage() {
    const [clickInformation, setClickInformation] = useState();
    const [listInformation, setListInformation] = useState();
    const [selectedType, setSelectedType] = useState();
    const [listCardOn, setListCardOn] = useState(false);
    const [viewCourseComponent, setViewCourseComponent] = useState(false);
    const [point, setPoint] = useState({});
    const [courseLine, setCourseLine] = useState([]);
    const [courseNum, setCourseNum] = useState();

    const [gpsLoc, setGpsLoc] = useState({
        lat: 0,
        lng: 0,
    });
    const [inputText, setInputText] = useState();
    const [searchInformation, setSearchInformation] = useState({ info: [], value: '', text: '' });
    const [markerInformation, setMarkerInformation] = useState({ marker: [] });
    // const [information, setInformation] = useState({}); // information value from marker click event

    const getClickInfo = (info) => {
        setClickInformation(info);
    };

    const getClickInformation = (res) => {
        //console.log(res);
    };

    const getSearchBarInfo = (item) => {
        if (item !== undefined) {
            if (item.info) {
                setListInformation(item.info);
                setSelectedType(item.value);
                setInputText(item.text);
                if (item.text != '') {
                    setListCardOn(true);
                }
            }
        }
    };

    const clickAddCourse = (info) => {
        setViewCourseComponent(true);
        setPoint(info);
    };

    /*useEffect(() => {
    }, [point]);*/

    useEffect(() => {
        if (clickInformation !== undefined) {
            setInfoCard(true);
        }
    }, [clickInformation]);

    const clearCoursePoint = () => {
        setPoint(null);
    };

    const drawCourse = (point) => {
        setCourseLine([]);
        setCourseLine(point);
        setCourseNum(point.length);
    };

    const closeCourseComponent = () => {
        setViewCourseComponent(false);
        setCourseLine([]);
        setCourseNum(0);
    };

    const checkCourseNum = () => {
        // to return course point length
    };

    const returnCourseNum = (num) => {
        setCourseNum(num);
    };

    const clickMarker = (info) => {
        // setInformation(info);
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

    const isPc = useMediaQuery({ query: "(min-width:426px)" });
    const isMobile = useMediaQuery({ query: "(max-width:426px)" });

    return (
        <>
            <SearchContext.Provider value={{ searchInformation, setSearchInformation }}>
                <MarkerContext.Provider value={{ markerInformation, setMarkerInformation }}>
                    <div>
                    {isPc && <NavBar />}
                    {isMobile && <MobileNavBar />}
                    </div>

                    {/*<CategoryBtn propFunction={getGpsLoc} gpsInformation={gpsLoc} />*/}

                    <div className="styles.map">
                        {listCardOn ? (
                            <ListCard
                                listInformation={listInformation}
                                selectedType={selectedType}
                                propFunction={getClickInfo}
                                clickAddCourse={clickAddCourse}
                                inputText={inputText}
                                getClickInformation={getClickInformation}
                                checkCourseNum={checkCourseNum}
                                courseNum={courseNum}
                            />
                        ) : null}

                        <MapSearchBar propFunction={getSearchBarInfo} />

                        {viewCourseComponent ? (
                            <MapCourse
                                point={point}
                                clearCoursePoint={clearCoursePoint}
                                drawCourse={drawCourse}
                                closeCourseComponent={closeCourseComponent}
                                checkCourseNum={checkCourseNum}
                                returnCourseNum={returnCourseNum}
                            />
                        ) : null}
                        <MapContainer
                            markerInformation={listInformation}
                            clickedInformation={clickInformation}
                            courseLine={courseLine}
                            gpsInformation={gpsLoc}
                            propFunction={clickAddCourse}
                            clickMarker={clickMarker}
                        />
                    </div>
                </MarkerContext.Provider>
            </SearchContext.Provider>
        </>
    );
}

export default MapPage;
