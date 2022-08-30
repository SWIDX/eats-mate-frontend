import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Map.module.css";
import XMLParser from "react-xml-parser"; /*추후 삭제*/
import { useDispatch } from "react-redux";
import { changeRestInfo, chageInfolen } from "../../_actions/restaurant_action";

const MapSearchBar = (props) => {
  const [inputText, setInputText] = useState("");
  const [selectValue, setSelectValue] = useState("전체");
  const [information, setInformation] = useState([]); // data(restaurant, tour)

  const [propsItem, setPropsItem] = useState({
    info: information,
    value: selectValue,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (information.length != 0) {
      setPropsItem({
        info: information,
        value: selectValue,
      });
    }
  }, [information]);

  useEffect(() => {
    setPropsItem({
      info: information,
      value: selectValue,
    });
  }, [selectValue]);

  useEffect(() => {
    props.propFunction(propsItem);
  }, [propsItem]);

  const selectBoxChange = (e) => {
    var value = e.target.value;
    setSelectValue(value);
  };

  const onInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  function parseXMLtoJSON(xmlData) {
    const data = new XMLParser().parseFromString(xmlData).children;
    setInformation(data[1].children[0].children);
    props.propFunction(information);
  }

  /*useEffect(() => {
    props.propFunction2(tourInformation);
    //console.log(tourInformation[0]);
  }, [tourInformation]); // to set tourInformation directly*/

  const handleOnEnterKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectValue === "전체") {
        var place = inputText;
      } else if (selectValue === "여행지") {
        var place = inputText;
        /*url 수정, parseXMLtoJSON도 추후 삭제*/
        var url =
          "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&contentTypeId=12&keyword=";

        axios.get(url + place).then((res) => {
          const data = res.data;
          parseXMLtoJSON(data);
        });
      } else if (selectValue === "음식점") {
        var restaurant = inputText;
        var url = "http://localhost:8081/map-service/information/findByName/";

        const data = await axios.get(url + restaurant).then((res) => {
          return res.data;
        });

        if (data != undefined || data != []) {
          setInformation(data);
          dispatch(changeRestInfo(data));
          dispatch(chageInfolen(data.length));
          props.propFunction(information);
        }
      }
      setInputText("");
    }
  }; // input Enter key press event function

  return (
    <div className={styles.search}>
      <button className={styles.dropbtn}>{selectValue}</button>
      <div className={styles.dropdownContent}>
        <option value="전체" onClick={selectBoxChange}>
          전체
        </option>
        <option value="여행지" onClick={selectBoxChange}>
          여행지
        </option>
        <option value="음식점" onClick={selectBoxChange}>
          음식점
        </option>
      </div>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="  검색어를 입력하세요."
        value={inputText}
        onChange={onInputTextChange}
        onKeyPress={handleOnEnterKeyPress}
      ></input>
      <img
        className={styles.search_btn}
        alt="sesarch icon"
        onClick={() => handleOnKeyPress()}
        src="/img/search icon.png"
      />
    </div>
  );
};

export default MapSearchBar;
