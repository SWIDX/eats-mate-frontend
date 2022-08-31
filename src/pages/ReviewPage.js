import React from "react";
import { useLocation } from "react-router";

import ReviewInfo from "../components/review/ReviewInfo";
import AllReview from "../components/review/AllReview";

function ReviewPage() {
  const { state } = useLocation();
  return (
    <>
      <div>
        <ReviewInfo information={state} />
        <AllReview />
      </div>
    </>
  );
}

export default ReviewPage;
