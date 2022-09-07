import React, { useEffect, useState, useRef } from 'react';
import styles from "./Carousel.module.css";
import { ReactComponent as LeftBtnSvg } from "../../images/svg/carousel-left-button.svg"
import { ReactComponent as RightBtnSvg } from "../../images/svg/carousel-right-button.svg"

function Carousel(props) {
    const [slideState, setSlideState] = useState(0);
    const [timeoutId, setTimeoutId] = useState();
    
    const SLIDES_NUM = props.dataList.length - 1;

    const slideShowRef = useRef(null);
    const slideRef = useRef(null);
    const outerViewRef = useRef(null);
    const innerViewRef = useRef(null);
    const imageRef = [];
    const buttonRef = [];

    function imgClick(idx) {
        // not using useNavigate was intended
        window.location = props.dataList[idx].link;
    } // img click event function

    function leftBtnClick() {
        clearTimeout(timeoutId);
        if(slideState === 0) {
            setSlideState(SLIDES_NUM);
         } else {
            setSlideState(slideState - 1);
        }
    } // left button click event function

    function rightBtnClick() {
        clearTimeout(timeoutId);
        if(slideState >= SLIDES_NUM) {
            setSlideState(0)
        } else {
            setSlideState(slideState + 1);
        }
    } // right button click event function

    function pointBtnClick(num) {
        clearTimeout(timeoutId);
        setSlideState(num);
    } // point button click event function

    useEffect(()=> {
        slideRef.current.style.transition = "all 0.8s ease-in-out";
        outerViewRef.current.style.width = props.outerViewWidth;
        outerViewRef.current.style.height = props.outerViewHeight;
        slideRef.current.style.width = props.imageWidth;
        slideRef.current.style.height = props.imageHeight;
        innerViewRef.current.style.overflow = props.innerViewOverflow;
        if (props.innerViewOverflow == "visible") { slideShowRef.current.width = "100%"; }
        slideRef.current.style.gap = `${props.gap}px`;

        imageRef.forEach((ref, index) => {
            ref.style.borderRadius = `${props.imageRadius}px`
            ref.style.minWidth = props.imageWidth;
            // ref.style.minHeight = props.imageHeight; // 이거 적용하면 왜 min-width 무시됨..?
        });
        buttonRef[0].style.transform = `translateX(-${props.buttonSize/2}px)`
        buttonRef[1].style.transform = `translateX(${props.buttonSize/2}px)`
    },[]);

    useEffect(()=> {
        if (props.scrollStep == "full") {
            slideRef.current.style.transform = `translateX(-${slideState}00%) translateX(-${slideState * props.gap}px)`;
        }
        else if (props.scrollStep == "one") {
            slideRef.current.style.transform = `translateX(-${slideState * props.imageWidth.replace("px","")}px) translateX(-${slideState * props.gap}px)`;
        }
        if (props.autoScroll) setTimeoutId(setTimeout(() => rightBtnClick(), 4500));
    }, [slideState]);

    return (
        <div className={styles.slideShow} ref={slideShowRef}>

            <div className={styles.slideBtnContainer} ref={outerViewRef}>
                <div className={styles.leftBtn} onClick={() => leftBtnClick()} ref={ref => buttonRef[0] = ref}>
                    <LeftBtnSvg width={`${props.buttonSize}px`} height={`${props.buttonSize}px`} />
                </div>
                <div className={styles.rightBtn} onClick={() => rightBtnClick()} ref={ref => buttonRef[1] = ref}>
                    <RightBtnSvg width={`${props.buttonSize}px`} height={`${props.buttonSize}px`} />
                </div>

                <div className={styles.slideContainer} ref={innerViewRef}>
                    <div className={styles.slides} ref={slideRef}>
                        {props.dataList.map((data, index) => {
                            return <img className={styles.image} key={index} alt="slide img" onClick={() => imgClick(index)} src={data.image} ref={ref => imageRef[index] = ref} />
                        })}
                    </div>
                </div>
            </div>

            {props.showBullets ?
            <div className={styles.bullets}>
                {props.dataList.map((image, index) => {
                    return <div className={slideState == index ? styles.checked : styles.unchecked} onClick={() => pointBtnClick(index)} />
                })}
            </div>
            : null }
        </div>
    );
}

export default Carousel;