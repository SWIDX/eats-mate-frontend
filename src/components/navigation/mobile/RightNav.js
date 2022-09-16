import React from 'react';
import styled from 'styled-components';
import styles from "../NavBar.module.css"
import {Nav} from "react-bootstrap";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 480px) {
    flex-flow: column nowrap;
    background-color: #ffffff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
    top: 0;
    right: 0;
    height: 30vh;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #FA8576;
    }
  }
`;



const RightNav = ({ open }) => {
    return (
      <Ul open={open}>
        <Nav className={`me-auto ${styles.nav}`}>
                <Nav.Link href="/about">서비스 소개</Nav.Link>
                <Nav.Link href="/map">지도</Nav.Link>
                <Nav.Link href="/mypage">마이페이지</Nav.Link>
        </Nav>
      </Ul>
    )
}

export default RightNav;