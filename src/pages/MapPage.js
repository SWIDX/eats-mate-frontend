/* global kakao */

import React, { useState, useEffect } from 'react';
import styles from './MapPage.module.css';

const { kakao } = window;

function MapPage() {
  const [map, setMap] = useState(null);

  const [inputText, setInputText] = useState('');
  const [selectvalue, setSelectValue] = useState('location');

  var ps = new kakao.maps.services.Places();
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // marker info window

  useEffect(() => {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.5004988522186, 127.028079434784), // center location
        level: 3, // magnification level
      };

    // generate map
    var map = new kakao.maps.Map(mapContainer, mapOption);
    setMap(map);
  }, []); // useEffect

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < 3; i++) {
        displayMarker(data[i]); // display marker
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    }
  } // placesSearchCB

  function displayMarker(place) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // marker click event
    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          '</div>',
      );
      infowindow.open(map, marker);

      if (
        window.confirm('해당 위치를 기반으로 식당을 검색하시겠습니까?') === true
      ) {
        var circle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(place.y, place.x), // center location
          radius: 500, // radius(m)
          strokeWeight: 2,
          strokeColor: '#E97869',
          strokeOpacity: 1,
          strokeStyle: 'solid',
          fillColor: '#E97869',
          fillOpacity: 0.2,
        }); // generate circle

        circle.setMap(map);

        // search data
        findData(place.y, place.x);
      } else {
      }
    });
  } // displayMarker

  function findData(y, x) {
    alert(y + ' / ' + x); // check place
  } // fingData

  function infobarBtn() {
    var infobar = document.getElementById('infobar');
    /* infobar content initialization */
    infobar.style.display = 'none';
  } // infobarBtn

  function categoryBtn(value) {
    alert('카테고리 검색: ' + value);
    var infobar = document.getElementById('infobar');
    infobar.style.display = 'block';
  } // categoryBtn

  function gps() {
    alert('GPS 선택');
  }

  function selectBoxChange(e) {
    var value = e.target.value;
    setSelectValue(value);
  }

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOnEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectvalue === 'location') {
        var place = inputText;

        ps.keywordSearch(place, placesSearchCB);
      } else if (selectvalue === 'name') {
        var restaurant = inputText;
        alert(restaurant);
      }
      setInputText('');
    }
  }; // input Enter key press event function

  const handleOnKeyPress = () => {
    if (selectvalue === 'location') {
      var place = inputText;

      ps.keywordSearch(place, placesSearchCB);
    } else if (selectvalue === 'name') {
      var restaurant = inputText;
      alert(restaurant);
    }
    setInputText('');
  }; // search btn key press event function

  return (
    <div className="Map">
      <div className={styles.search}>
        <select id="select" onChange={selectBoxChange}>
          <option value="location">장소</option>
          <option value="name">식당</option>
        </select>
        <input
          type="text"
          id="search"
          name="search"
          value={inputText}
          placeholder="  검색어를 입력하세요."
          onChange={onChange}
          onKeyPress={handleOnEnterKeyPress}
        ></input>
        <img
          className={styles.search_btn}
          alt="sesarch icon"
          onClick={() => handleOnKeyPress()}
          src="/img/search icon.png"
        />
      </div>

      <div className={styles.infobar} id="infobar">
        <button onClick={infobarBtn}>X</button>
        <h5>식당명</h5>
        <hr></hr>
        <h6>주소</h6>
        <hr></hr>
        <h6>영업시간</h6>
        <hr></hr>
        <h6>전화번호</h6>
      </div>

      <div className={styles.category}>
        <ul>
          <li>
            <button onClick={() => categoryBtn('전체')}>전체</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('한식')}>한식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('중식')}>중식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('일식')}>일식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('양식')}>양식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('기타')}>기타</button>
          </li>
          <li>
            <img
              className={styles.gps}
              alt="gps icon"
              onClick={() => gps()}
              src="/img/gps icon.jpg"
            />
          </li>
        </ul>
      </div>

      <div
        className={styles.map}
        id="map"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      ></div>
    </div>
  );
}

export default MapPage;
