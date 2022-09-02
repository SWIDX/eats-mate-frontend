import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./Course.module.css"

function Course(props) {
    const [toggleMenu, setTogglemenu] = useState(false);
    const menuRef = useRef();

    function convertDistance(distance) {
        if (distance < 1000) return distance + "m"
        else {
            return (distance / 1000).toFixed(1) + "km"
        }
    }

    function openMenu() {
        setTogglemenu(true);
    }

    function onClickOutside(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTogglemenu(false)
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
    onClickOutside(menuRef);

    function deleteHandler() {
        props.deleteCourse(props.course.courseId);
        setTogglemenu(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {props.course.title}
                <div className={styles.courseMenu} onClick={openMenu}>
                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="7.5" r="1.5" transform="rotate(90 1.5 7.5)" fill="#8C8C8C"/>
                    <circle cx="1.5" cy="13.5" r="1.5" transform="rotate(90 1.5 13.5)" fill="#8C8C8C"/>
                    <circle cx="1.5" cy="1.5" r="1.5" transform="rotate(90 1.5 1.5)" fill="#8C8C8C"/>
                    </svg>
                </div>
            </div>

            <div className={styles.courseInfo}>
                <div className={styles.distanceList}>
                {props.course.distanceList.map((o, i) =>
                        <div className={styles.distance}><p>{convertDistance(o)}</p></div>
                )}
                <div className={styles.distance} /> {/* dummy div */}
                </div>
            
                <div className={styles.placeList}>
                {props.course.placeNameList.map((o, i) =>
                    <div className={styles.place}>
                        <div>
                            <div className={styles.courseNumber}><p>{i+1}</p></div>
                            <div className={styles.courseDash} />
                        </div>
                        <div className={styles.placeData}>
                            <div className={styles.placeName}><p>{o}</p></div>
                            <div className={styles.placeAddress}><p>{props.course.placeAddressList[i]}</p></div>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {toggleMenu ?
            <div className={styles.subMenu} ref={menuRef}>
                <div className={styles.deleteBtn} onClick={deleteHandler}>삭제하기</div>
            </div>
            : null
            }
        </div>
    );
}

export default Course;