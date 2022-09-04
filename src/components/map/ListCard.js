import React, { useState, useEffect } from 'react';
import TabMenu from './TabMenu';
import styles from './ListCard.module.css';
import InformationCard from './InformationCard';

function ListCard(props) {
    const [information, setInformation] = useState();
    const [onClose, setOnClose] = useState(true);

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

    const setClickedInformation = (res) => {
        setInformation(res);
        props.getClickInformation(res);
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
                        <span className={styles.result_name}>검색결과</span>
                        <span className={styles.result_tag}>{props.listInformation.length}건</span>
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
                <InformationCard clickInformation={information} propFunction={getOnClose} />
            )}
        </>
    );
}

export default ListCard;
