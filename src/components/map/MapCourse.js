import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useSelector } from 'react-redux';
import axios from "axios";

function MapCourse(props) {

  const userinfo = useSelector((state) => state.userReducer.userinfo);
  const [point, setPoint] = useState([]);
  const [title, setTitle] = useState();
  const [placeNameList, setPlaceNameList] = useState([]);
  const [placeAddressList, setPlaceAddressList] = useState([]);
  const [distanceList, setDistanceList] = useState([]);
  const [finalDistance, setFinalDistance] = useState();

  const clickCompleteBtn = () => {
    if(userinfo == null) {
      alert("코스를 완성하려면 로그인이 필요합니다.");
      console.log(placeNameList);
      console.log(placeAddressList);
      console.log(distanceList);
    } else {
       if(placeNameList.length == 1) {
        alert("코스를 완성하려면 두 개 이상의 경유지가 필요합니다.");
      } else {
        var finalTitle = "";
        if(title == undefined) {
          finalTitle = title;
        } else {
          finalTitle = userinfo.name+"메이트님의 혼행 코스";
        }

        var url = "http://localhost:8081/user-service/user/course/";
        var data = {
          title: finalTitle,
          placeNameList: placeNameList,
          placeAddressList: placeAddressList,
          distanceList: distanceList,
        }
        var config = {
          headers: {
            Authorization: "Bearer "+userinfo.accessToken,
          }
        }
        axios.post(url, data, config).then((res) => {
          alert("코스가 저장되었습니다. 마이페이지에서 확인해 보세요.");
        });
      } // if-else
    }
  }; // save user course

  const clickCloseComponentBtn = (info) => {
    setPoint(point.filter(point => point.name == info));
    setPlaceNameList(placeNameList.filter(placeNameList => placeNameList[0] == info));
    setPlaceAddressList(placeAddressList.filter(placeAddressList => placeAddressList[0] == info));
    setDistanceList(distanceList.filter(distanceList => distanceList[0] == 1234567));

    props.closeCourseComponent();
  }; // delete all point data

  const clickDeleteBtn = (info) => {
    var index = point.findIndex(point => point.name == info.name);
    placeNameList.splice(index, 1);
    placeAddressList.splice(index, 1);
    setDistanceList(distanceList.filter(distanceList => distanceList[0] == "1234567"));

    setPoint(point.filter(point => point.name !== info.name));
  };

  const onInputTitleChange = (e) => {
    setTitle(e.target.value);
  };

  function getDistanceInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  };

  useEffect(() => {
    if( props.point!==null) {
      var addPoint = {
        num: props.point.information.length,
        lat: props.point.information.lat,
        lng: props.point.information.lng,
        name: props.point.information.name,
        address: props.point.information.address,
      };
      setPoint([...point, addPoint]);

      setPlaceNameList([...placeNameList, props.point.information.name]);

      setPlaceAddressList([...placeAddressList, props.point.information.address]);
    }

    props.clearCoursePoint(); // To clear(reset) course point data

  }, [props.point]);

  useEffect(() => {
      props.drawCourse(point); // To draw course line on the map

      if(point.length >= 2) {
        var resultList = [];
        for(var i=0; i+1< point.length; i++) {
          const result = getDistanceInKm(point[i].lat, point[i].lng, point[i+1].lat, point[i+1].lng);
          const resultToMeter = result * 1000;
          resultList[i] = parseInt(resultToMeter);
        }
        setDistanceList(resultList);
      }
  }, [point]);

  // to express all course distance;
  useEffect(() => {
    var finalDistance = 0;
    for(var i=0; i < distanceList.length; i++) {
      finalDistance += distanceList[i];
    }
    if(distanceList !== undefined) {// && finalDistance != 0
      setFinalDistance(finalDistance);
    }
  }, [distanceList]);

  return (
    <>
      <div className={styles.courseBox}>
        <div className={styles.courseBoxTitle}>
            <input
              className={styles.courseBoxInput}
              type="text"
              name="title"
              placeholder="코스 제목을 입력해주세요"
              value={title}
              size="24"
              onChange={onInputTitleChange} />
            <img src="/img/rice.png"
              style={{
                width:"25px",
                height:"25px",
                position: "absolute",
                right: "250px",
                top: "22.5px",
              }}/>
            <img src="/img/courseBtn.png"
              style={{
                width:"115px",
                height:"35px",
                position: "absolute",
                right: "60px",
                top: "20px",
              }}
              onClick={() => clickCompleteBtn()}/>
            <div className={styles.courseDistance}>
              총 이동거리:{finalDistance}m
            </div>

            <img src="/img/closeBtn.png"
              alt="close btn"
              style={{
                width:"30px",
                height:"30px",
                position: "absolute",
                right: "15px",
                top: "20px",
              }}
              onClick={() => clickCloseComponentBtn("all delete")}/>
        </div>

        <hr/>

        <div className={styles.courseBoxContent}>
          {point.map((info) => (
            <div>
              <div className={styles.courseBoxName}>{info.name}</div>
              <div className={styles.courseBoxAddress}>{info.address}</div>
              <div className={styles.courseDeleteBtn}>
                  <img src="/img/courseDeleteBtn.png"
                        alt="course point delete btn"
                        width="25"
                        height="25"
                        onClick={() => clickDeleteBtn(info)}/>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );

}

export default MapCourse;