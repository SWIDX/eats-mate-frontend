import React from "react";
import styles from "./NavBar.module.css"
import LoginButton from "../login/LoginButton";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux'
import LogoutButton from "../login/LogoutButton"
import { ReactComponent as LogoSvg } from "../../images/svg/navbar-logo.svg";


function NavBar() {
    const userinfo = useSelector((state) => state.userReducer.userinfo)

    return (
        <Navbar expand="lg" bg="light" variant="light" sticky="top" className={styles.navbar}>
            <Container style={{ width: "75%" }}>
                <Navbar.Brand href="/" className={styles.logoContainer}>
                    <LogoSvg className={styles.logoSvg}/>
                </Navbar.Brand>
                <Nav className={`me-auto ${styles.nav}`}>
                    <Nav.Link href="/about">서비스 소개</Nav.Link>
                    <Nav.Link href="/map/main">지도</Nav.Link>
                    <Nav.Link href="/mypage">마이페이지</Nav.Link>
                </Nav>
                <Nav>
                    {
                        userinfo == null ? <LoginButton /> :
                        <>
                            <div className={styles.userprofile}>
                                <Image
                                    src={userinfo.profileImageUrl}
                                    roundedCircle
                                />
                                <p><b>{userinfo.name}</b> 메이트님</p>
                            </div>
                            <LogoutButton />
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;