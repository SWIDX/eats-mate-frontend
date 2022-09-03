import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useSelector } from 'react-redux';
import axios from "axios";

function MapCourse(props) {

  const userinfo = useSelector((state) => state.userReducer.userinfo);
  const [point, setPoint] = useState([]);
  const [title, setTitle] = useState();
  const [placeNameList, setPlaceNameList] = useState([]);
  const [placeAddressList, setPlaceAddressList] = useState([]); // lat, lng
  const [distance, setDistance] = useState();
  const [distanceList, setDistanceList] = useState([]);
  const [finalDistance, setFinalDistance] = useState();

  const clickCompleteBtn = () => {
    if(userinfo == null) {
     //alert("코스를 완성하려면 먼저 로그인을 해주세요");
      if(placeNameList.length == 1) {
        alert("코스를 완성하려면 두 개 이상의 경유지가 필요합니다.");
      } else {
        console.log(placeNameList);
        console.log(placeAddressList);
        console.log(distanceList);
      }
    } else {
      setTitle(userinfo.name+"메이트님의 혼행 코스");
       if(placeNameList.length == 1) {
        alert("코스를 완성하려면 두 개 이상의 경유지가 필요합니다.");
      } else {
        var url = "http://localhost:8081/user-service/user/course/";
        // 추후 title 수정 작업 진행
        var data = {
          title: title,
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
  };

  const clickCloseComponentBtn = (info) => {
    setPoint(point.filter(point => point.name == info));
    setPlaceNameList(placeNameList.filter(placeNameList => placeNameList[0] == info));
    setPlaceAddressList(placeAddressList.filter(placeAddressList => placeAddressList[0] == info));
    setDistanceList(distanceList.filter(distanceList => distanceList[0] == 1234567));
    props.propFunction3();
  }; // delete all point data

  const clickDeleteBtn = (info) => {
    var index = point.findIndex(point => point.name == info.name);
    placeNameList.splice(index, 1);
    placeAddressList.splice(index, 1);
    setDistanceList(distanceList.filter(distanceList => distanceList[0] == "1234567"));

    setPoint(point.filter(point => point.name !== info.name));
    //distanceList.length=0;
    //setDistanceList(distanceList.filter(distanceList => distanceList[index] == info));
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
        num: props.point.length,
        lat: props.point.lat,
        lng: props.point.lng,
        name: props.point.name,
        address: props.point.address,
      };
      setPoint([...point, addPoint]);

      setPlaceNameList([...placeNameList, props.point.name]);

      setPlaceAddressList([...placeAddressList, props.point.address]);
    }

    props.propFunction(); // To clear course point data

  }, [props.point]);

  useEffect(() => {
      props.propFunction2(point); // To draw course line on the map]

      //setDistance(0);
      if(point.length >= 2) {
        var resultList = [];
        for(var i=0; i+1< point.length; i++) {
          const result = getDistanceInKm(point[i].lat, point[i].lng, point[i+1].lat, point[i+1].lng);
          const resultToMeter = result * 1000;
          resultList[i] = parseInt(resultToMeter);
          //setDistanceList([...distanceList, parseInt(resultToMeter)]);
        }
        setDistanceList(resultList);
      } //else if(point.length == 1) {
        //setDistance(0);
      //}
  }, [point]);
  //const result = getDistanceInKm(point[point.length-1].lat, point[point.length-1].lng, point[point.length-2].lat, point[point.length-2].lng);

  useEffect(() => {
    if(distance !== undefined) {
      console.log("test:" + distance);
      setDistanceList([...distanceList, distance]);
    }
  }, [distance]);

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
              size="19"
              onChange={onInputTitleChange} />
            <img src="/img/rice.png"
              style={{
                position: "absolute",
                right: "210px",
                top: "22.5px",
              }}/>
            <img src="/img/courseBtn.png"
              style={{
                position: "absolute",
                right: "60px",
                top: "15px",
              }}
              onClick={() => clickCompleteBtn()}/>
            <div className={styles.courseDistance}>
              총 거리:{finalDistance}m
            </div>

            <img src="/img/closeBtn.png"
              alt="close btn"
              width="35"
              height="35"
              style={{
                position: "absolute",
                right: "20px",
                top: "15px",
              }}
              onClick={() => clickCloseComponentBtn("all delete")}/>
        </div>

        <hr/>

        {point.map((info) => (
          <div>
            <div>{info.num}</div>
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

    </>
  );

}

export default MapCourse;