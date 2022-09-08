import React from "react";
import axios from 'axios';
import styles from "./Like.module.css"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Like(props) {
    const userinfo = useSelector((state) => state.userReducer.userinfo)
    const navigate = useNavigate();

    async function requestDelete() {
        try {
            const res = await axios.delete("http://localhost:8081/user-service/user/like/" + props.like.id,
                { //header
                    headers: { 'Authorization': `Bearer ${userinfo.accessToken}` }
                }
            );
            props.deleteLike(props.like.id);
        } catch(e) {
            console.warn(e);
        }
    }

    function gotoDetailPage() {
        navigate("/detail/" + props.like.name);
    }

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 13.5L12 19L11 20L6 16L2 11L0.5 6.5L2 2.5L5 1H8L11.5 2.5L13.5 1H17L21 3.5V8.5L18.5 13.5Z" fill="#E97869"/>
                <path d="M10.9999 3.77851L10.014 2.76513C7.69986 0.386381 3.45661 1.20726 1.92486 4.19788C1.20573 5.60451 1.04348 7.63538 2.35661 10.2273C3.62161 12.7229 6.25336 15.7121 10.9999 18.9681C15.7464 15.7121 18.3767 12.7229 19.6431 10.2273C20.9562 7.63401 20.7954 5.60451 20.0749 4.19788C18.5431 1.20726 14.2999 0.385006 11.9857 2.76376L10.9999 3.77851ZM10.9999 20.625C-10.083 6.69351 4.50848 -4.17999 10.7579 1.57163C10.8404 1.64726 10.9215 1.72563 10.9999 1.80676C11.0774 1.7257 11.1582 1.64773 11.2419 1.57301C17.4899 -4.18274 32.0827 6.69213 10.9999 20.625Z" fill="#E97869"/>
                </svg>
            </div>
            <div className={styles.likeInfo}>
                <div className={styles.title}>
                    <div className={styles.name} onClick={gotoDetailPage}>{props.like.name}</div>
                    <div className={styles.gubun}>{props.like.gubun}</div>
                </div>
                <div className={styles.address}>{props.like.address}</div>
            </div>
            <div className={styles.deleteBtn} onClick={requestDelete}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11.5" fill="#FAFAFA" stroke="#B0B0B0"/>
                <path d="M16.2853 7.71423L7.71387 16.2857" stroke="#B0B0B0"/>
                <path d="M16.2852 16.2855L7.71373 7.71411" stroke="#B0B0B0"/>
                </svg>
            </div>
        </div>
    );
}

export default Like;