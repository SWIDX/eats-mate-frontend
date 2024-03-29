import React, {useState} from "react";
import styles from "./Review.module.css";
import ReviewModal from "./ReviewModal";

function AllReview(props){

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }


    return(
        <>
            <div className={styles.responsivewrapper}>
                <br></br><br></br>
                <p className={styles.gagename}>총 3건의 리뷰가 있어요</p>
                <hr className={styles.line}/>

                <div className={styles.locationboxflex}>
                    <div className={styles.ratebox}>
                        <div className={styles.locationboxflex}>
                            <img className={styles.rateimg} src="/img/besttextcolor.png"></img>
                            <img className={styles.rateimg} src="/img/sosotext.png"></img>
                            <img className={styles.rateimg} src="/img/badtext.png"></img>
                        </div>
                    </div>

                    <div className={styles.locationboxflex}>
                    <div className={styles.carouselsize2}>

                    </div>
                    </div>

                    <div className={styles.locationboxflex2}>
                    <div className={styles.locationboxflex}>
                    <img className={styles.rrr} src="/img/rrr.png"></img>
                    <div className={styles.rrrcontent}>{props.information.name}에서 혼밥해본 적이 있다면 직접 리뷰를 남겨보세요</div>
                    </div>
                    <div>
                        <button className={styles.modalbutton} onClick={showModal}><img src="/img/goreview.png"></img></button>
                        {modalOpen && <ReviewModal setModalOpen={setModalOpen} />}
                    </div>
                    </div>
                </div>
    

                <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                <img className={styles.reviewimg} src="/img/emonga.jpeg" alt="first pic" />

                <div className={styles.locationboxflex}>
                    <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                    <div className={styles.reviewwriter}>나는야먹짱</div>
                    <div className={styles.reviewdate}> | 2022.01.08</div>
                </div>

                <hr/>


                <div className={styles.reviewcontent}>말해뭐해 일단 너무 맛있고요... 혼자 건대갔다가 들렀는데 혼밥하기 좋아요 추천</div>
                <img className={styles.reviewimg} src="/img/emonga.jpeg" alt="first pic" />

                <div className={styles.locationboxflex}>
                    <img src="/img/emonga.jpeg" alt="first pic" className={styles.reviewwriterimg}></img>
                    <div className={styles.reviewwriter}>나는야먹짱</div>
                    <div className={styles.reviewdate}> | 2022.01.08</div>
                </div>

            </div>
        </>

    );
}

export default AllReview;