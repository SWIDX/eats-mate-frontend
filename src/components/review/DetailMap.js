import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './DetailMap.module.css';
import { ReactComponent as KakaoMapSvg } from "../../images/svg/kakaomap-button.svg";

const DetailMap = (props) => {
  const [storePos, setStorePos] = useState({})
  const [centerPos, setCenterPos] = useState({})
  const [userPos, setUserPos] = useState(undefined);

  useEffect(() => {
    setStorePos({lat: props.information.lat, lng: props.information.lng})
    setCenterPos({lat: props.information.lat, lng: props.information.lng})
  }, [props.information.lat])

  function urlScheme(){
    let url;
    url = "https://map.kakao.com/link/to/" + props.information.name + "," + props.information.lat + "," + props.information.lng
    console.log(url);
    window.open(url, '_blank');
  }

  function copyText(){
    navigator.clipboard.writeText(props.information.address)
    alert("주소가 복사되었습니다.");
  }

  function getLocation() {
  if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(getUserLatLng);
  else
      alert("GPS를 지원하지 않는 브라우저입니다.");
  }

  function getUserLatLng(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    let pos = {};
    pos["lat"] = lat;
    pos["lng"] = lng;
    setUserPos(pos);
    setCenterPos(pos);
  }

  return (
    <>
      <div className={styles.detail_map_wrapper}>
        <div className={styles.detail_map_wrapper_top}>
          <p className={styles.detail_map_title}>찾아가는 길을 알려드릴게요</p>
          <div className={styles.detail_map_address}>
            <div className={styles.detail_map_box}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_845_626)">
              <path d="M6.54545 18C6.47616 18.0001 6.40772 17.9843 6.3451 17.9536C6.28248 17.9229 6.22725 17.878 6.18341 17.8225C5.92617 17.5268 0 10.3801 0 6.77217C0.00252025 4.97688 0.692946 3.25591 1.91991 1.98644C3.14688 0.716978 4.81026 0.00260755 6.54545 0C8.27976 0.00261192 9.94218 0.717298 11.1676 1.98705C12.3931 3.25679 13.0814 4.97779 13.0814 6.77217C13.0814 10.3801 7.15523 17.5268 6.89798 17.8225C6.85517 17.8768 6.80146 17.9208 6.74059 17.9514C6.67972 17.982 6.61313 17.9986 6.54545 18ZM6.54545 0.985761C5.06218 0.985761 3.63966 1.59536 2.59082 2.68052C1.54199 3.76568 0.952759 5.23752 0.952759 6.77217C0.952759 9.28587 4.6971 14.4512 6.54545 16.7382C8.38428 14.4512 12.1286 9.28587 12.1286 6.77217C12.1286 5.23923 11.5407 3.76889 10.4939 2.68401C9.44715 1.59913 8.02707 0.988373 6.54545 0.985761Z" fill="#8C8C8C"/>
              <path d="M6.54529 9.49294C5.78723 9.49294 5.06023 9.18138 4.52419 8.62679C3.98816 8.07219 3.68701 7.31997 3.68701 6.53565C3.68701 5.75133 3.98816 4.99912 4.52419 4.44452C5.06023 3.88992 5.78723 3.57837 6.54529 3.57837C7.30335 3.57837 8.03037 3.88992 8.5664 4.44452C9.10243 4.99912 9.40357 5.75133 9.40357 6.53565C9.40357 7.31997 9.10243 8.07219 8.5664 8.62679C8.03037 9.18138 7.30335 9.49294 6.54529 9.49294ZM6.54529 4.63308C6.03991 4.63308 5.55525 4.84082 5.1979 5.21055C4.84054 5.58029 4.63977 6.08172 4.63977 6.6046C4.63977 7.12748 4.84054 7.62904 5.1979 7.99877C5.55525 8.3685 6.03991 8.57613 6.54529 8.57613C7.05066 8.57613 7.53534 8.3685 7.89269 7.99877C8.25005 7.62904 8.45081 7.12748 8.45081 6.6046C8.45081 6.08172 8.25005 5.58029 7.89269 5.21055C7.53534 4.84082 7.05066 4.63308 6.54529 4.63308Z" fill="#8C8C8C"/>
              </g>
              <defs>
              <clipPath id="clip0_845_626">
              <rect width="13.0909" height="18" fill="white"/>
              </clipPath>
              </defs>
              </svg>
              <div className={styles.detail_map_font}>{props.information.address}</div>

              <div className={styles.detail_icon}>
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="0.5" width="9" height="11" rx="0.5" fill="white" stroke="#8E8E8E"/>
                <rect x="0.5" y="3.5" width="9" height="11" rx="0.5" fill="white" stroke="#8E8E8E"/>
                <path d="M2 7H8" stroke="#8E8E8E"/>
                <path d="M2 10H8" stroke="#8E8E8E"/>
                </svg>
              </div>
              <div onClick={copyText} className={styles.detail_map_font2}>
                주소 복사
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detail_map}>
          {storePos.lat && // undefined 주면 안됨
          <>
          <Map
            className={styles.kakao_map} // 지도를 표시할 Container
            center={centerPos}
            onCenterChanged={(map) =>
              setCenterPos({
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng()
              })
            }
            isPanto={true}
            style={{
              // 지도의 크기
              width: '100%',
              height: '50vh',
            }}
            level={3} // 지도의 확대 레벨
          >

            <MapMarker
            position={{lat: props.information.lat, lng: props.information.lng}}
            image={{
              src: "../img/map-marker/pin_fork.svg",
              size: {
                width: 64,
                height: 69
              }
            }}
            />
            {userPos != undefined &&
            <MapMarker
            position={{lat: userPos.lat, lng: userPos.lng}}
            image={{
              src: "../img/map-marker/pin_user.svg",
              size: {
                width: 64,
                height: 69
              }
            }}
            />
            }
          </Map>

          <div className={styles.buttonContainer}>
            <div className={styles.whiteButton} onClick={getLocation}><div>내 위치로 이동</div></div>
            <div className={styles.whiteButton} onClick={() => {setCenterPos(storePos)}}><div>가게 위치로 이동</div></div>
            <div className={styles.blackButton} onClick={urlScheme}>
              <KakaoMapSvg />
              <div>카카오맵에서 길찾기</div>
            </div>
          </div>
          </>
          }
        </div>
      </div>
    </>
  );
};

export default DetailMap;
