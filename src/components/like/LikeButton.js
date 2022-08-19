import React, { useState } from "react";
import { useSelector } from 'react-redux'
import styles from "./LikeButton.module.css";
import axios from 'axios';

function LikeButton(props) {
    const userinfo = useSelector((state) => state.userReducer.userinfo)
    const [clicked, setClicked] = useState(props.clicked);

    async function handleLike() {
        if (userinfo == null) {
            window.alert("로그인이 필요합니다.");
        }
        else {
            try {
                if (clicked) {
                    const res = await axios.delete("http://localhost:8081/user-service/user/like/" + props.placeId,
                        { //header
                            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
                        }
                    );
                }
                else {
                    const res = await axios.put("http://localhost:8081/user-service/user/like/" + props.placeId,
                        null, // parameter
                        { //header
                            headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
                        }
                    );
                }
                setClicked(!clicked)
            } catch(e) {
                console.warn(e);
                window.alert("오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    }

    return (
        <div className={clicked ? styles.likeButtonClicked : styles.likeButton} onClick={handleLike}>
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9999 3.77857L10.014 2.76519C7.69986 0.386442 3.45661 1.20732 1.92486 4.19794C1.20573 5.60457 1.04348 7.63544 2.35661 10.2273C3.62161 12.7229 6.25336 15.7122 10.9999 18.9682C15.7464 15.7122 18.3767 12.7229 19.6431 10.2273C20.9562 7.63407 20.7954 5.60457 20.0749 4.19794C18.5431 1.20732 14.2999 0.385067 11.9857 2.76382L10.9999 3.77857ZM10.9999 20.6251C-10.083 6.69357 4.50848 -4.17993 10.7579 1.57169C10.8404 1.64732 10.9215 1.72569 10.9999 1.80682C11.0774 1.72577 11.1582 1.64779 11.2419 1.57307C17.4899 -4.18268 32.0827 6.69219 10.9999 20.6251Z" fill="current"/>
            </svg>
        </div>
    );
}

export default LikeButton;