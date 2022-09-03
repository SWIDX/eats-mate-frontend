import React from "react";
import styles from "./Login.module.css";
import { ReactComponent as RightArrowSvg } from "../../images/svg/right-arrow.svg";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { changeUserInfo } from '../../_actions/user_action';
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        if (window.confirm('정말로 로그아웃 하시겠습니까?')) {
            // logout
            try{
                const res = await axios.delete("http://localhost:8081/user-service/auth/logout",
                    {
                        withCredentials: true // Set-Cookie 작동을 위해 필수
                    }
                );
                
            } catch(e) {
                console.warn(e);
            }
            dispatch(changeUserInfo(null))
            navigate("/")
        }
    }

    return (
        <div className={styles.logout_btn} onClick={handleLogout}>
            <div>로그아웃</div>
            <RightArrowSvg stroke="#939393"/>
        </div>
    );
}

export default LogoutButton;