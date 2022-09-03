import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './Map.module.css';

const MapSearchBar = (props) => {
    const [inputText, setInputText] = useState('');
    const [selectValue, setSelectValue] = useState('전체');
    const [information, setInformation] = useState([]); // data(restaurant, tour)
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef();

    const [propsItem, setPropsItem] = useState({
        info: information,
        value: selectValue,
    });

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

    const handleOnEnterKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const url = 'http://localhost:8081/map-service/getAllData?keyword=';
            let data = await axios.get(url + inputText).then((res) => {
                return res.data;
            });
            if (data) {
                console.log(data);
                setInformation(data);
            }
        }
    }; // input Enter key press event function

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
                        <option value="여행지" onClick={selectBoxChange}>
                            여행지
                        </option>
                        <option value="음식점" onClick={selectBoxChange}>
                            음식점
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
                <div className={styles.search_btn} onClick={() => handleOnEnterKeyPress()}>
                    <img alt="sesarch icon" src="/img/search icon.png" />
                </div>
            </div>
        </div>
    );
};

export default MapSearchBar;
