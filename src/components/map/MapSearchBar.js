import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import styles from './Map.module.css';
import { SearchContext } from '../../context/SearchContext';

const MapSearchBar = (props) => {
    const [inputText, setInputText] = useState('');
    const [selectValue, setSelectValue] = useState('전체');
    const [information, setInformation] = useState([]); // data(restaurant, tour)
    const [showDropDown, setShowDropDown] = useState(false);
    const [text, setText] = useState('');
    const dropDownRef = useRef();

    const { searchInformation, setSearchInformation } = useContext(SearchContext);

    const [propsItem, setPropsItem] = useState({
        info: information,
        value: selectValue,
        text: text,
    });

    useEffect(() => {
        setPropsItem({
            info: information,
            value: selectValue,
            text: text,
        });
    }, [information]);

    useEffect(() => {
        setPropsItem({
            info: information,
            value: selectValue,
            text: text,
        });
    }, [selectValue]);

    useEffect(() => {
        setSearchInformation(propsItem);
        props.propFunction(propsItem);
    }, [propsItem]);

    const selectBoxChange = (e) => {
        var value = e.target.value;
        setSelectValue(value);
    };

    const onInputTextChange = (e) => {
        setInputText(e.target.value);
    };

    const handleOnEnterKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getSearchResult();
        }
    }; // input Enter key press event function

    const handleClickSearch = async () => {
        getSearchResult();
    }

    async function getSearchResult() {
        const url = 'http://localhost:8081/map-service/getAllData?keyword=';
        let data = await axios.get(url + inputText).then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return [];
            }
        });
        setText(inputText);
        setInformation(data);
    }

    function onClickOutside(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowDropDown(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    onClickOutside(dropDownRef);

    return (
        <div className={styles.search}>
            <div ref={dropDownRef}>
                <div className={styles.dropbtn} onClick={() => setShowDropDown(!showDropDown)}>
                    <div className={styles.dropbtnLabel}>{selectValue}</div>
                    <div className={styles.dropbtnIcon}>
                        {showDropDown ? (
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 7L12 7L6 -5.24537e-07L0 7Z" fill="white" />
                            </svg>
                        ) : (
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0H0L6 7L12 0Z" fill="white" />
                            </svg>
                        )}
                    </div>
                </div>
                {showDropDown ? (
                    <div className={styles.dropdownContent} onClick={() => setShowDropDown(false)}>
                        <option value="전체" onClick={selectBoxChange}>
                            전체
                        </option>
                        <option value="음식점" onClick={selectBoxChange}>
                            음식점
                        </option>
                        <option value="여행지" onClick={selectBoxChange}>
                            여행지
                        </option>
                    </div>
                ) : null}
            </div>
            <div className={styles.inputBackground}>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="검색어를 입력하세요."
                    value={inputText}
                    onChange={onInputTextChange}
                    onKeyPress={handleOnEnterKeyPress}
                />
                <div className={styles.search_btn} onClick={() => handleClickSearch()}>
                    <img alt="sesarch icon" src="/img/search icon.png" />
                </div>
            </div>
        </div>
    );
};

export default MapSearchBar;
