import styles from "./Review.module.css";

function ReviewModal({ setModalOpen }){

    //모달 끄기
    const closeModal = () => {
        setModalOpen(false);
    }

    return(
            <div className={styles.container}>
                <button className={styles.close} onClick={closeModal}>
                 X
                </button>
                <div className={styles.reviewmodalname}><b>김연수</b> 메이트님!</div>
                <div className={styles.reviewmodalname}>식사는 맛있게 하셨나요? 리뷰를 작성해보세요</div>

                <div className={styles.locationboxflex}>
                    <img className={styles.reviewmodalimg} alt="" src="/img/emonga.jpeg"/>
                    <div className={styles.locationboxflex2}>
                    <div className={styles.reviewmodalcategory}>일식</div>
                    <b className={styles.reviewmodalname}>성수완당 본점</b>

                    <div className={styles.locationboxflex}>
                        <img alt="" src="/img/location.png"></img>
                        <div className={styles.reviewmodallocation}></div>
                    </div>
                </div>


                </div>
                <hr className={styles.line2}></hr>

<div className={styles.reviewmodalask}><b>성수완당 본점</b>의 만족도는 어땠나요?</div>

    
            </div>
        )
}

export default ReviewModal;