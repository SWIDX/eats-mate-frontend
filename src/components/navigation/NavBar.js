import React from "react";
import styles from "./NavBar.module.css"
import LoginButton from "../login/LoginButton";
import { Container, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {

    return (
        <Navbar expand="lg" bg="light" variant="light" sticky="top" className={styles.navbar}>
            <Container>
                <Navbar.Brand href="/">Eats Mate</Navbar.Brand>
                <Nav className={`me-auto ${styles.nav}`}>
                    <Nav.Link href="/about">서비스 소개</Nav.Link>
                    <Nav.Link href="/map">지도</Nav.Link>
                    <Nav.Link href="/mypage">마이페이지</Nav.Link>
                </Nav>
                <Nav>
                    <LoginButton />
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;