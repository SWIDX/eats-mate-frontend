import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Map.module.css';

const MapSearchBar = (props) => {
  const [inputText, setInputText] = useState('');
  const [selectvalue, setSelectValue] = useState('all');
  const [information, setInformation] = useState([]);

  useEffect(() => {
    if (information.length != 0) {
      props.propFunction(information);
    }
  }, [information]);

  const selectBoxChange = (e) => {
    var value = e.target.value;
    setSelectValue(value);
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOnEnterKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectvalue === 'all') {
        var place = inputText;
      } else if (selectvalue === 'restaurant') {
        var restaurant = inputText;
        var url = 'http://localhost:8081/map-service/information/findByName/';
        const data = await axios.get(url + restaurant).then((res) => {
          return res.data;
        });
        if (data != undefined || data != []) {
          setInformation(data);
        }
      }
      setInputText('');
    }
  }; // input Enter key press event function

  const handleOnKeyPress = () => {
    if (selectvalue === 'location') {
      var place = inputText;
    } else if (selectvalue === 'name') {
      var restaurant = inputText;
      var url = 'http://localhost:8081/map-service/information/findByName/';
      
      axios.get(url + restaurant).then((res) => {
        setInformation(res.data);
        props.propFunction(information);
      });
    }
    setInputText('');
  }; // search btn key press event function

  return (
    <div className={styles.search}>
      <select id="select" onChange={selectBoxChange}>
        <option value="all">장소</option>
        <option value="tourist_area">관광지</option>
        <option value="cultural_facilities">문화시설</option>
        <option value="festival">행사/공연/축제</option>
        <option value="shopping">쇼핑</option>
        <option value="restaurant">식당</option>
      </select>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="  검색어를 입력하세요."
        value={inputText}
        onChange={onChange}
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