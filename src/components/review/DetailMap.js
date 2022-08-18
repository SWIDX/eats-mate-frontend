import React, { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styles from './Review.module.css';

const DetailMap = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.56076811229905, lng: 126.93694098263262 }, //37.566767891, 126.978657934
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
  });
  //센터 이동은 한번검색에 한번만.
  //첫번째 검색결과에만 해당되도록 bool 인수 할당

  //추후 다른 페이지와 연결시 props를 통해 detail information을
  //부모 컴포넌트를 통해 전달받아서 핀으로 보여줄 것

  return (
    <>
      <div className={styles.detail_map_wrapper}>
        <div className={styles.detail_map_wrapper_top}>
          <p className={styles.detail_map_title}>찾아가는 길을 알려드릴게요</p>
          <div className={styles.detail_map_address}>주소</div>
        </div>
        <hr />

        <div className={styles.detail_map}>
          <Map
            className={styles.detail_map} // 지도를 표시할 Container
            center={state.center}
            isPanto={state.isPanto}
            style={{
              // 지도의 크기
              width: '60%',
              height: '50vh',
            }}
            level={2} // 지도의 확대 레벨
            onCenterChanged={(map) =>
              setState({
                center: {
                  lat: map.getCenter().getLat(),
                  lng: map.getCenter().getLng(),
                },
              })
            }
          ></Map>
        </div>
      </div>
    </>
  );
};

export default DetailMap;
