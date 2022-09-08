import React, { useEffect, useState } from 'react';
import styles from './MapCourse.module.css';
import { useSelector } from 'react-redux';
import { ReactComponent as Pin } from '../../images/svg/course-pin.svg';
import { ReactComponent as Emoticon } from '../../images/svg/course-emoticon.svg';
import { ReactComponent as CompleteBtn } from '../../images/svg/course-complete-button.svg';
import { ReactComponent as ExitBtn } from '../../images/svg/course-exit-button.svg';
import { ReactComponent as DeleteBtn } from '../../images/svg/course-delete-button.svg';
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
          finalTitle = userinfo.name+"메이트님의 혼행 코스";
        } else {
          finalTitle = title;
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
      var checkName = placeNameList.find(function(data){ return data === (props.point.information.name)});
      if (checkName !== undefined) {
          alert("이미 추가된 경유지입니다.");
      } else {
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
      props.returnCourseNum(point.length);
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

  useEffect(() => {
    props.returnCourseNum(point.length);
  }, [props.checkCourseNum]);

  return (
    <>
      <div>
        <div className={styles.courseBox}>
          <div className={styles.courseBoxTitle}>
              <input
                className={styles.courseBoxInput}
                type="text"
                name="title"
                placeholder="&nbsp;&nbsp;코스 제목을 입력해주세요"
                value={title}
                size="24"
                onChange={onInputTitleChange} />
              <Emoticon 
                style={{
                  width:"25px",
                  height:"25px",
                  position: "absolute",
                  right: "245px",
                  top: "25px",
                }}/>
              <CompleteBtn
                style={{
                  width:"140px",
                  height:"35px",
                  position: "absolute",
                  right: "50px",
                  top: "20px",
                }}
                onClick={() => clickCompleteBtn()}
              />
              <div className={styles.courseDistance}>
                총 이동거리&nbsp;{finalDistance}m
              </div>

              <ExitBtn
                style={{
                  width:"35px",
                  height:"35px",
                  position: "absolute",
                  right: "15px",
                  top: "20px",
                }}
                onClick={() => clickCloseComponentBtn("all delete")}
              />
          </div>

          <hr/>

          <div className={styles.courseBoxContent}>
            {point.map((info) => (
              <div>
                <div className={styles.courseBoxName}>{info.name}</div>
                <div className={styles.courseBoxAddress}>{info.address}</div>
                <div className={styles.courseDeleteBtn}>
                    <DeleteBtn
                      width="25"
                      height="25"
                      onClick={() => clickDeleteBtn(info)}
                    />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recommendBox}>

          <div className={styles.recommendBoxTitle}>
            다음 장소로 여기는 어때요?
          </div>
          <div className={styles.recommendBoxComment}>
            다른 메이트들이 나의 코스와 함께 추가한 장소들이에요
          </div>

          <div className={styles.recommendBoxContentList}>
            <div className={styles.recommendBoxContent}>
              <div className={styles.recommendBoxImg}>이미지 div</div>
              <div className={styles.recommendBoxName}>갤러리 마노</div>
              <div className={styles.recommendBoxDistance}>
                <Pin className={styles.icon} />
                최근 코스에서&nbsp;<b>2.3km</b>
              </div>
            </div>

            <div className={styles.recommendBoxContent}>
              <div className={styles.recommendBoxImg}>이미지 div</div>
              <div className={styles.recommendBoxName}>능인선원</div>
              <div className={styles.recommendBoxDistance}>
                <Pin className={styles.icon} />
                최근 코스에서&nbsp;<b>1.3km</b>
              </div>
            </div>
          </div>

        </div>

      </div>

    </>
  );

}

export default MapCourse;