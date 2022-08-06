/* global kakao */

import React, { useState, useEffect } from 'react';
import styles from './Map.module.css';
import axios from 'axios';

function categoryBtn(props) {

  const [gpsLoc, setGpsLoc] = useState({
    lat: 37.56076811229905,
    lng: 126.93694098263262,
  });
  const [border, setBorder] = useState("1px solid #CDCDCD");
  const [information, setInformation] = useState([]);

  useEffect(() => {
    props.propFunction(gpsLoc);
  }, [gpsLoc]);

  /*useEffect(() => {
    props.propFunction2(information);
  }, [information]);*/

  function getUserLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setGpsLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        //props.propFunction(gpsLoc);
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

  function gps() {
    getUserLoc();
  }

  /*function category(gubun) {
    setBorder('1px solid #e97869');
    var url = '/map-service/information/findByCategory/';
      
    axios.get(url + gubun +'/'+ gpsLoc.lat +'/'+ gpsLoc.lng).then((res) => {
      console.log(res.data);
      setInformation(res.data);
      //props.propFunction2(information);
    });
  }*/

  return (
    <>
      <div className={styles.category}>
        <ul>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                alt="category_1"
                onClick={() => category('전체')}
                src="/img/category_1.png"
                width='20'
                height='30'
              />
            </div>
          </li>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                  alt="category_1"
                  onClick={() => category('한식')}
                  src="/img/category_2.png"
                  width='20'
                  height='30'
                />
            </div>
          </li>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                  alt="category_1"
                  onClick={() => category('일식')}
                  src="/img/category_3.png"
                  width='20'
                  height='30'
                />
            </div>
          </li>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                  alt="category_1"
                  onClick={() => category('중식')}
                  src="/img/category_4.png"
                  width='20'
                  height='30'
                />
            </div>
          </li>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                  alt="category_1"
                  onClick={() => category('양식')}
                  src="/img/category_5.png"
                  width='20'
                  height='30'
                />
            </div>
          </li>
          <li>
            <div className={styles.category_btn} style={{border}}>
              <img
                  alt="category_1"
                  onClick={() => category('기타')}
                  src="/img/category_6.png"
                  width='20'
                  height='30'
                />
            </div>
          </li>
          <li>
            <img
              className={styles.gps}
              alt="gps icon"
              onClick={() => gps()}
              src="/img/gps icon.jpg"
              width='50'
              height='50'
            />
          </li>
        </ul>
      </div>
    </>
  );
}
export default categoryBtn;
