import React from "react";

import ReviewInfo from "../components/review/ReviewInfo";
import AllReview from "../components/review/AllReview";

function ReviewPage(){


    return(
        <>
            <div>
                <ReviewInfo/>
                <AllReview/>
            </div>
        </>
    );
}

export default ReviewPage;