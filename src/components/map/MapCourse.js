import React, { useEffect, useState } from 'react';
import styles from './MapCourse.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Pin } from '../../images/svg/course-pin.svg';
import { ReactComponent as RiceEmoticon } from '../../images/svg/course-title-emoticon.svg';
import { ReactComponent as CompleteBtn } from '../../images/svg/course-complete-button.svg';
import { ReactComponent as ExitBtn } from '../../images/svg/course-exit-button.svg';
import { ReactComponent as DeleteBtn } from '../../images/svg/course-delete-button.svg';
import axios from "axios";
import { changeUserInfo, reissueJWT } from '../../_actions/user_action';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

function MapCourse(props) {
  const SERVER = "eats-mate.com:8081"
  const userinfo = useSelector((state) => state.userReducer.userinfo);
  const [point, setPoint] = useState([]);
  const [title, setTitle] = useState();
  const [placeNameList, setPlaceNameList] = useState([]);
  const [placeAddressList, setPlaceAddressList] = useState([]);
  const [distanceList, setDistanceList] = useState([]);
  const [finalDistance, setFinalDistance] = useState();
  const [recommendation, setRecommendation] = useState([]);
  const [currentPos, setCurrentPos] = useState({});
  const [clickRecommendCourse, setClickRecommendCourse] = useState(null);
  const [overlayLatLng, setOverlayLatLng] = useState({lat:null, lng:null, name:null});
  const dispatch = useDispatch();

  async function checkExp() {
    if(userinfo != null) {
      const isTokenExpired = Date.now() >= userinfo.expirationTime - 10000;
      console.log('Date.now(): ', Date.now());
      console.log('exp - 10s: ', userinfo.expirationTime - 10000);
      console.log('isTokenExpired: ', isTokenExpired);
  
      if (isTokenExpired) {
        // invalid
        console.log("*** ACCESS TOKEN OUTDATED ***")
        try {
            const res = await axios.get("http://" + SERVER + "/user-service/auth/reissue",
            {
                withCredentials: true // Set-Cookie 작동을 위해 필수
            }
            );
            console.log(dispatch(reissueJWT(res.data)))
            clickCompleteBtn();
    
        } catch(e) {
            console.log(e);
            console.log("*** REFRESH TOKEN OUTDATED ***")
            window.alert("코스를 완성하려면 로그인이 필요합니다.");  
            await logOut(); // rt outdated
        }
      }
      else {
          // valid
          console.log("*** VALID USERINFO ***")
          clickCompleteBtn();
      }
    }
    else {
      // not logged in
      console.log("*** NOT LOGGED IN ***")
      window.alert("로그인이 필요합니다.");
      await logOut(); // rt outdated
    }
  }
      
  async function logOut() {
    // logout
    try {
      const res = await axios.delete("http://" + SERVER + "/user-service/auth/logout",
        {
            withCredentials: true // Set-Cookie 작동을 위해 필수
        }
      );
    } catch(e) {
        console.warn(e);
    }
    dispatch(changeUserInfo(null))
  }

  const clickCompleteBtn = () => {
    if(placeNameList.length == 1) {
      alert("코스를 완성하려면 두 개 이상의 경유지가 필요합니다.");
    }
    else {
      if (window.confirm("코스를 저장하시겠어요?")) {
        var finalTitle = "";
        if(title == undefined) {
          finalTitle = userinfo.name+"메이트님의 혼행 코스";
        } else {
          finalTitle = title;
        }

        var url = "http://" + SERVER + "/user-service/user/course/";
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
          alert("코스를 저장했어요! 마이페이지에서 확인해보세요.");
        });
      } // if-else
    }
  }; // save user course

  const clickCloseComponentBtn = (info) => {
    if (window.confirm("코스 만들기를 취소하시겠어요?")) {
      setPoint(point.filter(point => point.name == info));
      setPlaceNameList(placeNameList.filter(placeNameList => placeNameList[0] == info));
      setPlaceAddressList(placeAddressList.filter(placeAddressList => placeAddressList[0] == info));
      setDistanceList(distanceList.filter(distanceList => distanceList[0] == 1234567));

      props.closeCourseComponent();
    }
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

  const onClickRecommendCourse = (info) => {
    setClickRecommendCourse(info);
    setOverlayLatLng({lat:info.lat, lng:info.lng, name:info.name});
  }

  useEffect(() => {
    props.clickRecommendCourse(clickRecommendCourse);
    setClickRecommendCourse(null);
}, [clickRecommendCourse]);

  useEffect(() => {
    props.getOverlayLatLng(overlayLatLng);
}, [overlayLatLng]);

  useEffect(() => {
    if (props.point !== null) {
      console.log(props.point.information);
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

      // 추천 받아오기
      setCurrentPos({lat: props.point.information.lat, lng: props.point.information.lng})
      getRecommendation()
    }

    props.clearCoursePoint(); // To clear(reset) course point data

  }, [props.point]);

  async function getRecommendation() {
    try {
      const res = await axios.get("http://" + SERVER + "/map-service/tour-information/findByNearby?"
        + "lat=" + props.point.information.lat
        + "&lng=" + props.point.information.lng
        + "&dist=" + 3 // 3km
      );
      console.log(res.data)
      const selected = res.data.sort(() => .5 - Math.random()).slice(0,2)
      console.log(selected)
      setRecommendation(selected)
    } catch(e){
      throw e;
    }
  }

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

  function convertDistance(distance) {
    if (distance < 1000) return distance + "m"
    else {
        return (distance / 1000).toFixed(1) + "km"
    }
  }

  return (
    <>
      <div>
        <div className={styles.courseBox} style={{bottom: placeNameList.length > 0 ? "305px" : "20px"}}>
          <div className={styles.courseBoxTitle}>
              <input
                className={styles.courseBoxInput}
                type="text"
                name="title"
                placeholder="코스 제목을 입력해주세요"
                value={title}
                size="24"
                onChange={onInputTitleChange}
              />
              <RiceEmoticon
                style={{
                  width:"25px",
                  height:"25px",
                  position: "absolute",
                  right: "195px",
                  top: "25px",
              }}/>
              <CompleteBtn
                style={{
                  width:"110px",
                  height:"35px",
                  position: "absolute",
                  right: "62px",
                  top: "18px",
                  cursor: "pointer"
                }}
                onClick={() => checkExp()}
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
                  top: "19px",
                  cursor: "pointer"
                }}
                onClick={() => clickCloseComponentBtn("all delete")}
              />
          </div>

          <hr/>

          <div className={styles.courseBoxContent}>
              <div className={styles.distanceList}>
              {distanceList.map((o, i) =>
                      <div className={styles.distance}><p>{convertDistance(o)}</p></div>
              )}
              <div className={styles.distance} /> {/* dummy div */}
              </div>
          
              <div className={styles.placeList}>
              {point.map((info, i) =>
                  <div className={styles.place}>
                      <div>
                          <div className={styles.courseNumber}><p>{i+1}</p></div>
                          <div className={styles.courseDash} />
                      </div>
                      <div className={styles.placeData}>
                          <div className={styles.placeName}><p>{info.name}</p></div>
                          <div className={styles.placeAddress}><p>{info.address}</p></div>
                      </div>
                      <div className={styles.courseDeleteBtn}>
                          <DeleteBtn
                            width="25"
                            height="25"
                            onClick={() => clickDeleteBtn(info)}
                          />
                      </div>
                  </div>
              )}
              </div>
          </div>
        </div>

        {placeNameList.length > 0 ?
        <div className={styles.recommendBox}>

          <div className={styles.recommendBoxTitle}>
            다음 장소로 여기는 어때요?
          </div>
          <div className={styles.recommendBoxComment}>
            다른 메이트들이 함께 추가한 장소들이에요
          </div>
          
          <div className={styles.recommendBoxContentList}>

          {recommendation.map((o,i) => {
            return (<div className={styles.recommendBoxContent}>
              <img className={styles.recommendBoxImg} src={o.represent_image != "" ? o.represent_image : "/img/map-recommend/no-image.png"} onClick={() => onClickRecommendCourse(o)} />
              <div className={styles.recommendBoxName}>{o.name}</div>
              <div className={styles.recommendBoxDistance}>
                <Pin className={styles.icon} />
                최근 코스에서&nbsp;<b>{getDistanceInKm(currentPos.lat, currentPos.lng, o.lat, o.lng).toFixed(1)}km</b>
              </div>
            </div>)
          })}

          </div>
        </div>
        : null
        }

      </div>

    </>
  );

}

export default MapCourse;