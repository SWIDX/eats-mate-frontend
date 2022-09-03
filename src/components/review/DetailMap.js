import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './Review.module.css';

const DetailMap = (props) => {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: props.information.lat, lng: props.information.lng }, //37.566767891, 126.978657934
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
          <div className={styles.detail_map_address}>
            <div className={styles.detail_map_box}>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_845_624)">
                <path d="M11.5455 21C11.4762 21.0001 11.4077 20.9843 11.3451 20.9536C11.2825 20.9229 11.2272 20.878 11.1834 20.8225C10.9262 20.5268 5 13.3801 5 9.77217C5.00252 7.97688 5.69295 6.25591 6.91991 4.98644C8.14688 3.71698 9.81026 3.00261 11.5455 3C13.2798 3.00261 14.9422 3.7173 16.1676 4.98705C17.3931 6.25679 18.0814 7.97779 18.0814 9.77217C18.0814 13.3801 12.1552 20.5268 11.898 20.8225C11.8552 20.8768 11.8015 20.9208 11.7406 20.9514C11.6797 20.982 11.6131 20.9986 11.5455 21ZM11.5455 3.98576C10.0622 3.98576 8.63966 4.59536 7.59082 5.68052C6.54199 6.76568 5.95276 8.23752 5.95276 9.77217C5.95276 12.2859 9.6971 17.4512 11.5455 19.7382C13.3843 17.4512 17.1286 12.2859 17.1286 9.77217C17.1286 8.23923 16.5407 6.76889 15.4939 5.68401C14.4472 4.59913 13.0271 3.98837 11.5455 3.98576V3.98576Z" fill="#8C8C8C"/>
                <path d="M11.5453 12.4929C10.7872 12.4929 10.0602 12.1814 9.52419 11.6268C8.98816 11.0722 8.68701 10.32 8.68701 9.53565C8.68701 8.75133 8.98816 7.99912 9.52419 7.44452C10.0602 6.88992 10.7872 6.57837 11.5453 6.57837C12.3034 6.57837 13.0304 6.88992 13.5664 7.44452C14.1024 7.99912 14.4036 8.75133 14.4036 9.53565C14.4036 10.32 14.1024 11.0722 13.5664 11.6268C13.0304 12.1814 12.3034 12.4929 11.5453 12.4929ZM11.5453 7.63308C11.0399 7.63308 10.5553 7.84082 10.1979 8.21055C9.84054 8.58029 9.63977 9.08172 9.63977 9.6046C9.63977 10.1275 9.84054 10.629 10.1979 10.9988C10.5553 11.3685 11.0399 11.5761 11.5453 11.5761C12.0507 11.5761 12.5353 11.3685 12.8927 10.9988C13.25 10.629 13.4508 10.1275 13.4508 9.6046C13.4508 9.08172 13.25 8.58029 12.8927 8.21055C12.5353 7.84082 12.0507 7.63308 11.5453 7.63308Z" fill="#8C8C8C"/>
                </g>
                <defs>
                <clipPath id="clip0_845_624">
                <rect width="13.0909" height="18" fill="white" transform="translate(5 3)"/>
                </clipPath>
                </defs>
                </svg>
              </div>
                <div className={styles.detail_map_font}>{props.information.address}</div>

                  <div className={styles.detail_icon}>
                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.5" y="0.5" width="9" height="11" rx="0.5" fill="white" stroke="#8E8E8E"/>
                    <rect x="0.5" y="3.5" width="9" height="11" rx="0.5" fill="white" stroke="#8E8E8E"/>
                    <path d="M2 7H8" stroke="#8E8E8E"/>
                    <path d="M2 10H8" stroke="#8E8E8E"/>
                    </svg>
                  </div>
                  <div className={styles.detail_map_font2}>
                    주소 복사
                  </div>
                </div>
            </div>
        </div>

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
          >
            <MapMarker
            position={{
              lat:props.information.lat,
              lng:props.information.lng
            }}
            />
          </Map>
        </div>
      </div>
    </>
  );
};

export default DetailMap;
