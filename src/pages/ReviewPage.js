import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import ReviewInfo from "../components/review/ReviewInfo";
import Review from "../components/mypage/Review";
import { Container } from "react-bootstrap";
import NavBar from "../components/navigation/NavBar";

function ReviewPage() {
  const placeName = useLocation().pathname.split("/").pop();

  const [reviewList, setReviewList] = useState([]); // 리뷰 데이터 리스트

  useEffect(() => {
    getUserReview();
  }, []);

  async function getUserReview() {
    try {
      const res = await axios.get("http://localhost:8081/review-service/review/" + placeName + "/" + 0,
      );
      res.data.forEach((e, i) => res.data[i].createdBy = e.createdBy.replaceAll("-", ". "));
      setReviewList(res.data);
    } catch(e){
      throw e;
    }
  }

  return (
    <>
      <NavBar />
      <Container fluid="xxl" style={{ width: "75%", height: "100%", padding: "50px 0px 100px 0px"}}>
        {/* <ReviewInfo information={state} /> */}
        {reviewList.map((o, i) =>
          <Review
            review={o}
            mypageMode={false}
          />
        )}
      </Container>
    </>
  );
}

export default ReviewPage;
