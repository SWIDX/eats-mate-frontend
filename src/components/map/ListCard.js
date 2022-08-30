import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TabMenu from "./TabMenu";
import styles from "./ListCard.module.css";
import restReducer from "../../_reducers/restaurant_reducer";

function ListCard(props) {
  const mouseOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#ccc";
  };
  const mouseLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#fff";
  };

  const getSelectedInformation = (information) => {
    props.propFunction(information);
  };

  const number = useSelector((state) => state.restReducer.length);

  return (
    <>
      <div className={styles.list_outer}>
        <div className={styles.cardTop}>
          <span className={styles.result_name}>검색결과</span>
          <span className={styles.result_tag}>{number}건</span>
        </div>

        <div className={styles.tabmenu_outer}>
          <TabMenu
            className={styles.tabmenu}
            selectedType={props.selectedType}
          />
        </div>
      </div>
    </>
  );
}

export default ListCard;
