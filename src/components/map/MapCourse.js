import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { useSelector } from 'react-redux';

function MapCourse(props) {

  const userinfo = useSelector((state) => state.userReducer.userinfo);
  const [point, setPoint] = useState([/*{
    lat: "",
    lng: "",
    title: "",
    address: "",
    },*/
  ]);
  //const [point, setPoint] = useState();

  const clickCompleteBtn = () => {
    if(userinfo == null) {
      alert("코스를 완성하려면 먼저 로그인을 해주세요");
    } else {
      //alert("해당 식당을 찜하였습니다.(회원 정보: "+userinfo.name+"메이트님)");
    }
  };

  const clickCloseComponentBtn = (info) => {
    setPoint(point.filter(point => point.title == info));
    props.propFunction3();
  } // delete all point data

  const clickDeleteBtn = (info) => {
    setPoint(point.filter(point => point.title !== info));

    if(point.length >=2) { // To draw course line on the map
      props.propFunction2(point);
    }

    /* point.length == 1*/
  }

  useEffect(() => {
    if( props.point!==null) {
      var addPoint = {
        lat: props.point.children[13].value,
        lng: props.point.children[12].value,
        title: props.point.children[19].value,
        address: props.point.children[0].value,
      };
      setPoint([...point, addPoint]);
    }

    props.propFunction(); // To clear course point data

    if(point.length >=2) { // To draw course line on the map
      props.propFunction2(point);
    }
  }, [props.point]);

  return (
    <>
      <div className={styles.courseBox}>
        <div className={styles.courseBoxTitle}>
            <div>OOO 메이트님의 혼행 코스</div>
            <img src="/img/rice.png"
              style={{
                position: "absolute",
                right: "185px",
                top: "20px",
              }}/>
            <img src="/img/courseBtn.png"
              style={{
                position: "absolute",
                right: "60px",
                top: "15px",
              }}
              onClick={() => clickCompleteBtn()}/>

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
            <div className={styles.courseBoxName}>{info.title}</div>
            <div className={styles.courseBoxAddress}>{info.address}</div>
            <div className={styles.courseDeleteBtn}>
            <img src="/img/courseDeleteBtn.png"
                  alt="course point delete btn"
                  width="25"
                  height="25"
                  onClick={() => clickDeleteBtn(info.title)}/>
            </div>
          </div>
        ))}
      </div>



    </>
  );

}

export default MapCourse;