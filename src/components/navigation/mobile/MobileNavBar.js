import React from "react";
import styles from "../NavBar.module.css"
import { Container, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'
import { ReactComponent as LogoSvg } from "../../../images/svg/navbar-logo.svg";
import Burger from "./Burger";
import RightNav from "./RightNav";

function MobileNavBar() {
    const userinfo = useSelector((state) => state.userReducer.userinfo)

    return (
        <Navbar expand="lg" bg="white" variant="light" sticky="top" className={styles.navbar}>
            <Container style={{ width: "75%" }}>
                <Navbar.Brand href="/" className={styles.logoContainer}>
                    <LogoSvg className={styles.logoSvg}/>
                </Navbar.Brand>
                <RightNav/>
                <Burger/>
            </Container>
        </Navbar>
    );
}

export default MobileNavBar;