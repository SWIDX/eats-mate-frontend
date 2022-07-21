/* global kakao */

import React, { useState } from 'react';
import styles from './Map.module.css';

function categoryBtn() {
  function gps() {
    alert('GPS 선택');
  }
  return (
    <>
      <div className={styles.category}>
        <ul>
          <li>
            <button onClick={() => categoryBtn('전체')}>전체</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('한식')}>한식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('중식')}>중식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('일식')}>일식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('양식')}>양식</button>
          </li>
          <li>
            <button onClick={() => categoryBtn('기타')}>기타</button>
          </li>
          <li>
            <img
              className={styles.gps}
              alt="gps icon"
              onClick={() => gps()}
              src="/img/gps icon.jpg"
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default categoryBtn;
