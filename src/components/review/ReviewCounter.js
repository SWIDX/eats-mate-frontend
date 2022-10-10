import React, { useEffect } from "react";
import styles from "./ReviewCounter.module.css";
import { ReactComponent as Rate0Svg } from "../../images/svg/rate-0.svg";
import { ReactComponent as Rate1Svg } from "../../images/svg/rate-1.svg";
import { ReactComponent as Rate2Svg } from "../../images/svg/rate-2.svg";
import { useState } from "react";


function ReviewCounter(props) {
    const [highIdx, setHighIdx] = useState();

    useEffect(() => {
        var idx = props.rateVal.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        setHighIdx(idx);
    },[props]);

    return (
        <div className={styles.container}>
            <div className={styles.ratebox}>
                <Rate2Svg className={highIdx == 2 ? styles.colored : styles.grayed} />
                <div className={highIdx == 2 ? styles.highlight : styles.normal}>최고예요</div>
                <div className={styles.value}>{props.rateVal[2]}</div>
            </div>
            <div className={styles.ratebox}>
                <Rate1Svg className={highIdx == 1 ? styles.colored : styles.grayed} />
                <div className={highIdx == 1 ? styles.highlight : styles.normal}>평범해요</div>
                <div className={styles.value}>{props.rateVal[1]}</div>
            </div>
            <div className={styles.ratebox}>
                <Rate0Svg className={highIdx == 0 ? styles.colored : styles.grayed} />
                <div className={highIdx == 0 ? styles.highlight : styles.normal}>별로예요</div>
                <div className={styles.value}>{props.rateVal[0]}</div>
            </div>
        </div>
    );
}

export default ReviewCounter;