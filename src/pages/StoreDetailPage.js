import React from "react";
import MainReview from "../components/review/MainReview";
import MainGageInfo from "../components/review/MainGageInfo";
import DetailMap from "../components/review/DetailMap";
import { useLocation } from "react-router";

function StoreDetailPage(){

    const { state } = useLocation();

    return(
        <>
            <div>
                <MainGageInfo information={state}/>
                <DetailMap address={state.address} />
                <MainReview/>
            </div>
        </>
    );
}

export default StoreDetailPage;