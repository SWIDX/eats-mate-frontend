import React from 'react';

import styles from './Map.module.css';

function ListCard(props) {
  const mouseOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#ccc';
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#fff';
  };
  const clickInformation = (info) => {
    props.propFunction(info);
  };

  return (
    <>
      <div className={styles.list}>
        <div>
          <div className={styles.cardTop}>
            <div className={styles.result_name}>검색결과</div>
            <div className={styles.result_tag}>
              {props.listInformation.length}건
            </div>
          </div>
          <hr />
          {props.listInformation.map((item) => {
            return (
              <>
                <li
                  className={styles.result}
                  onMouseOver={mouseOver}
                  onMouseLeave={mouseLeave}
                >
                  <div onClick={() => clickInformation(item)}>{item.name}</div>
                  <div>{item.address}</div>
                </li>
                <hr />
              </>
            );
          })}

          <hr />
        </div>
      </div>
    </>
  );
}

export default ListCard;
