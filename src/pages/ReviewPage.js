import React from 'react';

import ReviewInfo from '../components/review/ReviewInfo';
import AllReview from '../components/review/AllReview';
import DetailMap from '../components/review/DetailMap';

function ReviewPage() {
  return (
    <>
      <div>
        <ReviewInfo />
        <div>
          <DetailMap />
        </div>
        <AllReview />
      </div>
    </>
  );
}

export default ReviewPage;
