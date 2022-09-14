import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, reissueJWT } from '../../_actions/user_action';
import styles from "./ReviewModal.module.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Rate0Svg } from "../../images/svg/rate-0.svg";
import { ReactComponent as Rate1Svg } from "../../images/svg/rate-1.svg";
import { ReactComponent as Rate2Svg } from "../../images/svg/rate-2.svg";

function ReviewModal(props) {
  const SERVER = "eats-mate.com:8081"
  const userinfo = useSelector((state) => state.userReducer.userinfo)
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(-1); // rate value
  const [contentText, setContentText] = useState(""); // content string

  function addImageFile(e) {
    if (e.target.files.length === 0) {
      console.warn("파일이 추가되지 않았습니다.")
      return;
    }
    const imgFile = e.target.files[0];
    const newImageList = [...imageList, imgFile]
    setImageList(newImageList)
    console.log(newImageList)
  }

  function submitReview() {
    if(contentText.length < 50) {
      alert("50자 이상 입력해주세요.");
      return;
    }

    if(selectedIdx == -1) {
      alert("만족도를 선택해주세요.");
      return;
    }

    if (!confirm("리뷰를 등록하시겠어요?")) {
      return;
    }

    const jsonData = {
      placeName: props.information.name,
      gugun: props.information.gugun,
      content: contentText,
      category: props.information.gubun,
      createdBy: new Date().toISOString().substring(0, 10),
      rate: selectedIdx
    }

    const formData = new FormData();
    formData.append('json', new Blob([JSON.stringify(
      jsonData
    )], {
      type: "application/json"
    }));
    const imgList = [...imageList]
    imgList.forEach((img) => formData.append('image', img))

    // formData는 그냥 console.log로 보이지 않음
    for (var item of formData.entries()) {
      console.log(item[0] + " : " + item[1]);
    }

    axios.post("http://" + SERVER + "/review-service/review",
      formData,
      {
          headers: {
              "Authorization": 'Bearer ' + userinfo.accessToken,
              "Content-type": "multipart/form-data",
          },                    
      }
    )
    .then(res => {
        console.log(`Success` + res.data);
        window.alert(props.information.name + "을 리뷰해주셔서 감사합니다!");
        props.closeModal();
    })
    .catch(err => {
        console.log(err);
        window.alert("오류가 발생했습니다.")
    })
  }

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
          submitReview();

        } catch(e) {
          console.log(e);
          console.log("*** REFRESH TOKEN OUTDATED ***")
          window.alert("로그인이 필요합니다.");  
          await logOut(); // rt outdated
        }
      }
      else {
        // valid
        console.log("*** VALID USERINFO ***")
        submitReview();
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
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={props.closeModal}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 17L17 1" stroke="#E97869" strokeWidth="2" strokeLinecap="round"/>
        <path d="M1 1L17 17" stroke="#E97869" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className={styles.reviewmodalname}><b>{userinfo.name}</b> 메이트님!</div>
      <div className={styles.reviewmodalname}>식사는 맛있게 하셨나요? 리뷰를 작성해보세요</div>

      <div className={styles.locationboxflex}>
        <img className={styles.reviewmodalimg} alt="" src="/img/emonga.jpeg" />
        <div className={styles.locationboxflex2}>
          <div className={styles.reviewmodalcategory}>{props.information.gubun}</div>
          <b className={styles.reviewmodalname2}>{props.information.name}</b>

          <div className={styles.addressflex}>
            <img alt="" src="/img/location.png"></img>
            <div className={styles.reviewmodallocation}>{props.information.address}</div>
          </div>

        </div>
      </div>
      
      <hr className={styles.line2}></hr>
      <div className={styles.reviewmodalask}>
        <b>{props.information.name}</b>의 만족도는 어땠나요?
      </div>
      
      <div className={styles.rateContainer}>
          <div className={styles.ratebox} onClick={() => {setSelectedIdx(2)}}>
              <Rate2Svg className={selectedIdx == 2 ? styles.colored : styles.grayed} />
              <div className={selectedIdx == 2 ? styles.highlight : styles.normal}>최고예요</div>
          </div>
          <div className={styles.ratebox} onClick={() => {setSelectedIdx(1)}}>
              <Rate1Svg className={selectedIdx == 1 ? styles.colored : styles.grayed} />
              <div className={selectedIdx == 1 ? styles.highlight : styles.normal}>평범해요</div>
          </div>
          <div className={styles.ratebox} onClick={() => {setSelectedIdx(0)}}>
              <Rate0Svg className={selectedIdx == 0 ? styles.colored : styles.grayed} />
              <div className={selectedIdx == 0 ? styles.highlight : styles.normal}>별로예요</div>
          </div>
      </div>

      <div className={styles.addReview}>
        <textarea
          id="reviewBox"
          name="reviewBox"
          rows="3"
          cols="50"
          placeholder="자유롭게 경험을 공유해주세요!"
          value={contentText}
          onChange={(e)=>{setContentText(e.target.value)}}
        />

        <div className={styles.bottomContainer}>
          <div className={styles.reviewWarning}>
            <b>리뷰 작성 시 유의사항</b><br />
            무분별한 악성 후기는 통보 없이 삭제될 수 있습니다.<br />
            작성하신 후기는 잇츠메이트의 마케팅 홍보로 사용될 수 있습니다.
          </div>

          <div className={styles.addReviewImg}>
            {imageList.length ?
              imageList.map((image, idx) => {
                return (
                <div className={styles.preview}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Thumb"
                  />
                </div>
              )}) : null
            }

            {imageList.length < 3 ?
            <>
              <input
                type="file"
                name="review_img"
                id="file"
                className={styles.imgInput}
                accept="image/jpg,image/png,image/jpeg"
                onChange={addImageFile}
              />
              <label className={styles.addButton} for="file">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.66634 2.83333H17.833V11H20.1663V2.83333C20.1663 1.5465 19.1198 0.5 17.833 0.5H2.66634C1.37951 0.5 0.333008 1.5465 0.333008 2.83333V16.8333C0.333008 18.1202 1.37951 19.1667 2.66634 19.1667H11.9997V16.8333H2.66634V2.83333Z" fill="#E97869"/>
                <path d="M7.33301 9.83333L3.83301 14.5H16.6663L11.9997 7.5L8.49967 12.1667L7.33301 9.83333Z" fill="#E97869"/>
                <path d="M20.1663 13.3334H17.833V16.8334H14.333V19.1667H17.833V22.6667H20.1663V19.1667H23.6663V16.8334H20.1663V13.3334Z" fill="#E97869"/>
                </svg>
                <div>사진 추가</div>
              </label>
            </>
            : null
            }
          </div>
        </div>

        {/* 함수 수정 필요 */}
        <div className={styles.reviewModalBtn}>
          <button className={styles.uploadReview} onClick={checkExp}>
            등록
          </button>
          <button className={styles.closeReview} onClick={props.closeModal}>
            취소
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReviewModal;
