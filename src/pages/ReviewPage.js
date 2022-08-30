import React, { useEffect } from "react";
import { useLocation } from "react-router";

import ReviewInfo from "../components/review/ReviewInfo";
import AllReview from "../components/review/AllReview";
import DetailMap from "../components/review/DetailMap";

function ReviewPage() {
  const { state } = useLocation();

  return (
    <>
      <div>
        <ReviewInfo information={state} />
        <div>
          <DetailMap address={state.address} />
        </div>
        <AllReview />
      </div>
    </>
  );
}

export default ReviewPage;
