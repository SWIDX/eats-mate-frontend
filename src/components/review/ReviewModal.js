import styles from "./Review.module.css";

function ReviewModal({ setModalOpen }) {
  //모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      <div className={styles.reviewmodalname}>
        <b>김연수</b> 메이트님!
      </div>
      <div className={styles.reviewmodalname}>
        식사는 맛있게 하셨나요? 리뷰를 작성해보세요
      </div>
      <div className={styles.locationboxflex}>
        <img className={styles.reviewmodalimg} alt="" src="/img/emonga.jpeg" />
        <div className={styles.locationboxflex2}>
          <div className={styles.reviewmodalcategory}>일식</div>
          <b className={styles.reviewmodalname}>성수완당 본점</b>

          <div className={styles.locationboxflex2}>
            <img alt="" src="/img/location.png"></img>
            <div className={styles.reviewmodallocation}></div>
          </div>
        </div>
      </div>
      <hr className={styles.line2}></hr>
      <div className={styles.reviewmodalask}>
        <b>성수완당 본점</b>의 만족도는 어땠나요?
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
        ></textarea>
        <div className={styles.reviewWarning}>
          <b>리뷰 작성 시 유의사항</b>
        </div>
        <div className={styles.reviewWarning}>
          무분별한 악성 후기는 통보 없이 삭제될 수 있습니다. <br />
          작성하신 후기는 잇츠메이트의 마케팅 홍보로 사용될 수 있습니다.
        </div>
        <div className={styles.addReviewImg}>
          <input
            type="file"
            name="file"
            id="file"
            className={styles.addImg}
            accept="image/*"
          />
          <label for="file">사진 첨부하기 </label>
        </div>
        {/* 함수 수정 필요 */}
        <div className={styles.reviewModalBtn}>
          <button className={styles.uploadReview} onClick={closeModal}>
            등록
          </button>
          <button className={styles.closeReview} onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
