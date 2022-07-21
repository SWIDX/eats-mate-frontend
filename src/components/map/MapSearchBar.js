import React, { useState } from 'react';
import styles from './Map.module.css';

function MapSearchBar(props) {
  const [inputText, setInputText] = useState('');
  const [selectvalue, setSelectValue] = useState('location');

  function selectBoxChange(e) {
    var value = e.target.value;
    setSelectValue(value);
  }

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOnEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectvalue === 'location') {
        var place = inputText;
      } else if (selectvalue === 'name') {
        var restaurant = inputText;
        alert(restaurant);
      }
      setInputText('');
    }
  }; // input Enter key press event function

  const handleOnKeyPress = () => {
    if (selectvalue === 'location') {
      var place = inputText;
    } else if (selectvalue === 'name') {
      var restaurant = inputText;
      alert(restaurant);
    }
    setInputText('');
  }; // search btn key press event function

  return (
    <div className={styles.search}>
      <select id="select" onChange={selectBoxChange}>
        <option value="location">장소</option>
        <option value="name">식당</option>
      </select>
      <input
        type="text"
        id="search"
        name="search"
        value={inputText}
        placeholder="  검색어를 입력하세요."
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
}

export default MapSearchBar;
