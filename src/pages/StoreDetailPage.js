import React from "react";
import MainReview from "../components/review/MainReview";
import MainGageInfo from "../components/review/MainGageInfo";

function StoreDetailPage(){


    return(
        <>
            <div>
                <MainGageInfo/>
                <MainReview/>
            </div>
        </>
    );
}

export default StoreDetailPage;