import React, { useState, useEffect, useRef } from "react";
import styles from "./Review.module.css"
import { useSelector } from 'react-redux';

function Review(props) {
    const userinfo = useSelector((state) => state.userReducer.userinfo)
    const [toggleMenu, setTogglemenu] = useState(false);
    const menuRef = useRef();

    function openMenu() {
        setTogglemenu(true)
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTogglemenu(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(menuRef);

    function deleteHandler() {
        props.deleteReview(props.review.id);
        setTogglemenu(false);
    }

    function viewImage(url) {
        window.open(url, '_blank');
    }

    return (
        <div className={styles.container}>
            <div className={styles.reviewInfo}>
                <div className={styles.title}>
                    {props.mypageMode ?
                    <>
                    <div className={styles.placeName}>{props.review.placeName}</div>
                    <div className={styles.category}>{props.review.category}</div>
                    </>
                    :
                    <>
                    <img className={styles.userProfileImg} src={props.review.userProfileImgUrl} />
                    <div className={styles.username}>{props.review.username}</div>
                    </>
                    }
                </div>
                <div className={styles.content}>{props.review.content}</div>
                {/* 이미지 */}
                <div className={styles.imageContainer}>
                {props.review.images.map((imgUrl, i) =>
                    imgUrl != "" && <img src={imgUrl} onClick={() => viewImage(imgUrl)} />
                )}
                </div>
                <div className={styles.meta}>
                    <div className={styles.rate}>
                    {props.review.rate == 0 ?
                    <>
                        <div>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#FFDC5F"/>
                            <path d="M12.4131 10.8333C12.8078 10.8333 13.0851 10.9293 13.2451 11.1213C13.4051 11.3133 13.4851 11.5426 13.4851 11.8093C13.4851 12.0866 13.4051 12.3213 13.2451 12.5133C13.0851 12.716 12.8078 12.8173 12.4131 12.8173C12.0291 12.8173 11.7518 12.716 11.5811 12.5133C11.4105 12.3213 11.3251 12.0866 11.3251 11.8093C11.3251 11.5426 11.4105 11.3133 11.5811 11.1213C11.7518 10.9293 12.0291 10.8333 12.4131 10.8333ZM19.2611 10.8333C19.6665 10.8333 19.9491 10.9293 20.1091 11.1213C20.2691 11.3133 20.3491 11.5426 20.3491 11.8093C20.3491 12.0866 20.2691 12.3213 20.1091 12.5133C19.9491 12.716 19.6665 12.8173 19.2611 12.8173C18.8771 12.8173 18.5998 12.716 18.4291 12.5133C18.2585 12.3213 18.1731 12.0866 18.1731 11.8093C18.1731 11.5426 18.2585 11.3133 18.4291 11.1213C18.5998 10.9293 18.8771 10.8333 19.2611 10.8333Z" fill="black"/>
                            <path d="M15.9331 17.4788C16.8078 17.4788 17.6611 17.5588 18.4931 17.7188C19.3251 17.8895 20.1198 18.1508 20.8771 18.5028C21.6345 18.8548 22.3331 19.2975 22.9731 19.8308L22.9731 21.1588C22.3118 20.6681 21.5971 20.2521 20.8291 19.9108C20.0611 19.5801 19.2665 19.3295 18.4451 19.1588C17.6238 18.9881 16.7918 18.9028 15.9491 18.9028C15.1278 18.9028 14.3118 18.9881 13.5011 19.1588C12.6905 19.3295 11.9118 19.5801 11.1651 19.9108C10.4078 20.2415 9.69314 20.6521 9.02114 21.1428L9.02114 19.8308C9.65048 19.2975 10.3385 18.8548 11.0851 18.5028C11.8211 18.1508 12.5998 17.8895 13.4211 17.7188C14.2425 17.5588 15.0798 17.4788 15.9331 17.4788Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.rateText}>별로예요</div>
                    </>
                    : null
                    }
                    {props.review.rate == 1 ?
                    <>
                        <div>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#FFDC5F"/>
                            <path d="M12.5772 10.74C12.9718 10.74 13.2492 10.836 13.4092 11.028C13.5692 11.22 13.6492 11.4493 13.6492 11.716C13.6492 11.9933 13.5692 12.228 13.4092 12.42C13.2492 12.6227 12.9718 12.724 12.5772 12.724C12.1932 12.724 11.9158 12.6227 11.7452 12.42C11.5745 12.228 11.4892 11.9933 11.4892 11.716C11.4892 11.4493 11.5745 11.22 11.7452 11.028C11.9158 10.836 12.1932 10.74 12.5772 10.74ZM19.4252 10.74C19.8305 10.74 20.1132 10.836 20.2732 11.028C20.4332 11.22 20.5132 11.4493 20.5132 11.716C20.5132 11.9933 20.4332 12.228 20.2732 12.42C20.1132 12.6227 19.8305 12.724 19.4252 12.724C19.0412 12.724 18.7638 12.6227 18.5932 12.42C18.4225 12.228 18.3372 11.9933 18.3372 11.716C18.3372 11.4493 18.4225 11.22 18.5932 11.028C18.7638 10.836 19.0412 10.74 19.4252 10.74Z" fill="black"/>
                            <path d="M15.3772 17.3855L16.6252 17.3855L16.6252 21.2575L15.3772 21.2575L15.3772 17.3855Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.rateText}>평범해요</div>
                    </>
                    : null
                    }
                    {props.review.rate == 2 ?
                    <>
                        <div>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#FFDC5F"/>
                            <path d="M12.55 10.92C12.9446 10.92 13.222 11.016 13.382 11.208C13.542 11.4 13.622 11.6293 13.622 11.896C13.622 12.1733 13.542 12.408 13.382 12.6C13.222 12.8026 12.9446 12.904 12.55 12.904C12.166 12.904 11.8886 12.8026 11.718 12.6C11.5473 12.408 11.462 12.1733 11.462 11.896C11.462 11.6293 11.5473 11.4 11.718 11.208C11.8886 11.016 12.166 10.92 12.55 10.92ZM19.398 10.92C19.8033 10.92 20.086 11.016 20.246 11.208C20.406 11.4 20.486 11.6293 20.486 11.896C20.486 12.1733 20.406 12.408 20.246 12.6C20.086 12.8026 19.8033 12.904 19.398 12.904C19.014 12.904 18.7366 12.8026 18.566 12.6C18.3953 12.408 18.31 12.1733 18.31 11.896C18.31 11.6293 18.3953 11.4 18.566 11.208C18.7366 11.016 19.014 10.92 19.398 10.92Z" fill="black"/>
                            <path d="M15.9331 21.0855C15.0798 21.0855 14.2425 21.0001 13.4211 20.8295C12.5998 20.6695 11.8211 20.4135 11.0851 20.0615C10.3385 19.7201 9.65048 19.2775 9.02114 18.7335L9.02114 17.4215C9.69314 17.9121 10.4078 18.3228 11.1651 18.6535C11.9118 18.9841 12.6905 19.2348 13.5011 19.4055C14.3118 19.5761 15.1278 19.6615 15.9491 19.6615C16.7918 19.6615 17.6238 19.5761 18.4451 19.4055C19.2665 19.2348 20.0611 18.9841 20.8291 18.6535C21.5971 18.3228 22.3118 17.9068 22.9731 17.4055L22.9731 18.7335C22.3331 19.2775 21.6345 19.7201 20.8771 20.0615C20.1198 20.4135 19.3251 20.6695 18.4931 20.8295C17.6611 21.0001 16.8078 21.0855 15.9331 21.0855Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.rateText}>최고예요</div>
                    </>
                    : null
                    }
                    </div>
                    <div className={styles.rateBorder} />
                    <div className={styles.createdBy}>{props.review.createdBy}</div>
                </div>
            </div>
            <div className={styles.others}>
                {props.mypageMode ?
                <div className={styles.reviewMenu} onClick={openMenu}>
                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="7.5" r="1.5" transform="rotate(90 1.5 7.5)" fill="#8C8C8C"/>
                    <circle cx="1.5" cy="13.5" r="1.5" transform="rotate(90 1.5 13.5)" fill="#8C8C8C"/>
                    <circle cx="1.5" cy="1.5" r="1.5" transform="rotate(90 1.5 1.5)" fill="#8C8C8C"/>
                    </svg>
                </div> : null }
                <div className={styles.reviewLike}>
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_172_152)">
                    <path d="M5.26794 6.82697H0.533203V17.7081H5.26794V6.82697Z" stroke="#B0B0B0" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M5.26758 6.82697L7.66161 0.525146H10.8128V6.82697H19.4665V18.4748H10.8128L5.26758 16.1537V6.82697Z" stroke="#B0B0B0" strokeWidth="2" strokeMiterlimit="10"/>
                    <path d="M2.90045 15.3764C3.33627 15.3764 3.68957 15.0285 3.68957 14.5992C3.68957 14.17 3.33627 13.822 2.90045 13.822C2.46463 13.822 2.11133 14.17 2.11133 14.5992C2.11133 15.0285 2.46463 15.3764 2.90045 15.3764Z" fill="#B0B0B0"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_172_152">
                    <rect width="20" height="19" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <div className={styles.recommend}>{props.review.recommend}</div>
                </div>
            </div>
            {toggleMenu && props.mypageMode ?
            <div className={styles.subMenu} ref={menuRef}>
                <div className={styles.deleteBtn} onClick={deleteHandler}>삭제하기</div>
            </div>
            : null
            }
        </div>
    );
}

export default Review;