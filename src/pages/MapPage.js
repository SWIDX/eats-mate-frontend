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
import NoContent from '../components/etc/mobile/NoContent';

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
    const [clickMarkerInformation, setClickMarkerInformation] = useState({information:null, type:null, id:null}); // information value from marker click event
    const [overlayLatLng, setOverlayLatLng] = useState({lat:null, lng:null, name:null});
    const [onCloseOverlay, setOnCloseOverlay] = useState(false);

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

    /* Marker && Recommend Course Click Event */
    const clickMarker = (info) => {
        if(info !== null) {
            setClickMarkerInformation({information:info, type:info.type, id:info.id});
        }
    };

    const clickRecommendCourse = (info) => {
        if(info !== null) {
            // Using the marker click function with(because of) the same action
            setClickMarkerInformation({information:info, type:"여행지", id:info.tourId.content_id});
        }
    }

    const clearClickMarkerInfo = () => {
        setClickMarkerInformation({information:null, type:null, id:null});
    }

    const getOverlayLatLng = (info) => {
        if(info.lat !== null) {
            setOverlayLatLng({lat:info.lat, lng:info.lng, name:info.name});
        }
    }

    const closeOverlay = (info) => {
        setOnCloseOverlay(info);
    };

    useEffect(() => {
        if(onCloseOverlay == true) {
            //props.closeOverlay(onCloseOverlay);
        }
        setOnCloseOverlay(false); // reset data
    }, [onCloseOverlay]);

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
                    <div>
                    {isMobile && <NoContent/>}
                    {isPc &&
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
                                markerInformation={clickMarkerInformation}
                                clearClickMarkerInfo={clearClickMarkerInfo}
                                getOverlayLatLng={getOverlayLatLng}
                                closeOverlay={closeOverlay}
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
                                clickRecommendCourse={clickRecommendCourse}
                                getOverlayLatLng={getOverlayLatLng}
                            />
                        ) : null}
                        <MapContainer
                            markerInformation={listInformation}
                            clickedInformation={clickInformation}
                            courseLine={courseLine}
                            gpsInformation={gpsLoc}
                            propFunction={clickAddCourse}
                            clickMarker={clickMarker}
                            clearClickMarker={clearClickMarkerInfo}
                            overlayLatLng={overlayLatLng}
                            onCloseOverlay={onCloseOverlay}
                        />
                    </div>}
                    </div>
                </MarkerContext.Provider>
            </SearchContext.Provider>
            
        </>
    );
}

export default MapPage;
