import React, { useState, useEffect, useContext } from 'react';
import TabMenu from './TabMenu';
import styles from './ListCard.module.css';
import InformationCard from './InformationCard';
import { SearchContext } from '../../context/SearchContext';

function ListCard(props) {
    const [information, setInformation] = useState();
    const [onClose, setOnClose] = useState(true);
    const { searchInformation } = useContext(SearchContext);

    const mouseOver = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#ccc';
    };
    const mouseLeave = (e) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#fff';
    };

    const getOnClose = (close) => {
        setOnClose(close);
    };

    const clickAddCourse = (info) => {
        props.clickAddCourse(info);
    };

    const setClickedInformation = (res) => {
        setInformation(res);
        //console.log(res);
        //props.getClickInformation(res);
    }; // click information props

    useEffect(() => {
        if (information != undefined) {
            if (onClose == true) {
                setOnClose(false);
            } else {
                setOnClose(true);
            }
        }
    }, [information]);

    useEffect(() => {
        if (props.listInformation) {
            setOnClose(true);
        }
    }, [props.listInformation]);

    return (
        <>
            {onClose ? (
                <div className={styles.list_outer}>
                    <div className={styles.cardTop}>
                        <span className={styles.result_name}>'{searchInformation.text}' 검색결과</span>
                        <span className={styles.result_tag}>{searchInformation.info.length}건</span>
                    </div>

                    <div className={styles.tabmenu_outer}>
                        <TabMenu
                            className={styles.tabmenu}
                            selectedType={props.selectedType}
                            information={props.listInformation}
                            setClickedInformation={setClickedInformation}
                        />
                    </div>
                </div>
            ) : (
                <InformationCard clickInformation={information} propFunction={getOnClose} clickAddCourse={clickAddCourse} />
            )}
        </>
    );
}

export default ListCard;
