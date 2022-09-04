import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, reissueJWT } from '../../_actions/user_action';
import styles from "./Review.module.css";
import { useNavigate } from "react-router-dom";

function ReviewModal(props) {
  const userinfo = useSelector((state) => state.userReducer.userinfo)
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();

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
    const jsonData = {
      placeName: props.information.name,
      gugun: props.information.gugun,
      content: "이미지 잘 올라가는지 확인해보려고 올렸어요",
      category: props.information.gubun,
      createdBy: new Date().toISOString().substring(0, 10),
      rate: 1
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

    axios.post("http://localhost:8081/review-service/review",
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
          const res = await axios.get("http://localhost:8081/user-service/auth/reissue",
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
      const res = await axios.delete("http://localhost:8081/user-service/auth/logout",
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
      {/* 임시 표정  */}
      <div className={styles.locationboxflex3}>
        <div className={styles.ratebox2}>
          <div className={styles.locationboxflex3}>
            <img className={styles.rateimg} src="/img/besttextcolor.png"></img>
            <img className={styles.rateimg} src="/img/sosotext.png"></img>
            <img className={styles.rateimg} src="/img/badtext.png"></img>
          </div>
        </div>
      </div>

      <div className={styles.addReview}>
        <textarea
          id="reviewBox"
          name="reviewBox"
          rows="3"
          cols="50"
          placeholder="자유롭게 경험을 공유해주세요!"
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
              <label className={styles.addButton} for="file">+</label>
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
