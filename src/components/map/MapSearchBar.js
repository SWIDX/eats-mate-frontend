import React, { useState } from 'react';
import axios from 'axios';
import styles from './Map.module.css';

const MapSearchBar = (props) => {
  const [inputText, setInputText] = useState('');
  const [selectvalue, setSelectValue] = useState('all');
  const [information, setInformation] = useState([]);

  const selectBoxChange = (e) => {
    var value = e.target.value;
    setSelectValue(value);
  };

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOnEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectvalue === 'all') {
        var place = inputText;
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&keyword=';
        
        axios.get(url + place).then((res) => {
          console.log(res.data);
        });

      } else if (selectvalue === 'tour') {
        var place = inputText;
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&contentTypeId=12&keyword=';
      
        axios.get(url + place).then((res) => {
          console.log(res.data);
        });

      } else if (selectvalue === 'culture') {
        var place = inputText;
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&contentTypeId=14&keyword=';
      
        axios.get(url + place).then((res) => {
          console.log(res.data);
        });
      
      } else if (selectvalue === 'event') {
        var place = inputText;
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&contentTypeId=15&keyword=';
      
        axios.get(url + place).then((res) => {
          console.log(res.data);
        });
      
      } else if (selectvalue === 'shopping') {
        var place = inputText;
        var url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey=iYVYThiw2Vsox6T1%2FhhDhR5iUTuaqxW2AJWXmsDBKqXk7Ct1Z03uYclP8SfSqlJ7%2Fg7LSPv8MRDTmgUKOQBcWw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A&areaCode=1&listYN=Y&contentTypeId=38&keyword=';
      
        axios.get(url + place).then((res) => {
          console.log(res.data);
        });
      
      } else if (selectvalue === 'name') {
        var restaurant = inputText;
        var url = 'http://localhost:9001/map-service/information/findByName/';
        axios.get(url+restaurant).then((res) => {
          setInformation(res.data);
          props.propFunction(information);
        });
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
        <option value="all">전체</option>
        <option value="tour">관광지</option>
        <option value="culture">문화시설</option>
        <option value="event">행사/공연/축제</option>
        <option value="shopping">쇼핑</option>
        <option value="name">식당</option>
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