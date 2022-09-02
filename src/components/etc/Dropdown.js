import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css"

function Dropdown(props) {

    const [currentCategory, setCurrentCategory] = useState(props.category[0])
    const [clicked, setClicked] = useState(false);
    const dropdownRef = useRef();

    function optionClickHandler(idx) {
        const category = props.category[idx]
        setCurrentCategory(category)
        props.selectHandler(category)
    }

    function onClickOutside(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setClicked(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    onClickOutside(dropdownRef);

    return (
        <div className={styles.container} onClick={() => setClicked(!clicked)} ref={dropdownRef}>
            <div className={styles.selection}>
                <div>{currentCategory}</div>
                <div className={styles.arrow}>
                    {clicked ?
                    <svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 6L9 1L1 6" stroke="#8C8C8C"/>
                    </svg>
                    :
                    <svg width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 6L17 1" stroke="#8C8C8C"/>
                    </svg>
                    }
                </div>
            </div>
            {clicked ?
            <div className={styles.option}>
                {props.category.map((o, i) =>
                    <div onClick={() => optionClickHandler(i)}>{o}</div>
                )}
            </div>
            : null
            }
        </div>
    );
}

export default Dropdown;