import { React, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './TabMenu.module.css';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function TabMenu(props) {
    const [defaultTab, setDefaultTab] = useState(0);
    const [selectedTab, setSelectedTab] = useState();
    const [tabData, setTabData] = useState([]);
    const [data, setData] = useState([]);

    const idx = {
        0: '전체',
        1: '음식점',
        2: '여행지',
    };

    const restaurant = {
        0: '전체',
        1: '한식',
        2: '양식',
        3: '일식',
        4: '중식',
        5: '기타',
    };

    const tour = {
        0: '전체',
        1: '문화시설',
        2: '행사/공연/축제',
        3: '쇼핑',
    };

    const onClickItem = async (item) => {
        if(item.type == "음식점") {
            const url = 'http://localhost:8081/map-service/getRestInfo?id=';
            let data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
            if (data) {
                console.log(data);
                props.propFunction(data);
            }
        } else if(item.type == "관광지") {
            const url = 'http://localhost:8081/map-service/getTourInfo?id=';
            let data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
            if (data) {
                console.log(data);
                props.propFunction(data);
            }
        }
    };

    useEffect(() => {
        if (selectedTab !== undefined) {
            let items;

            if (selectedTab.main !== '전체' && selectedTab.sub == undefined) {
                items = data.filter((item) => item.type == selectedTab.main);
            } else {
                if (selectedTab.main == '전체') {
                    items = data;
                }
                if (selectedTab.sub != '전체') {
                    items = data.filter((item) => item.gubun == selectedTab.sub);
                } else {
                    items = data.filter((item) => item.type == selectedTab.main);
                }
            }

            setTabData(items);
        }
    }, [selectedTab]);

    useEffect(() => {
        setData(props.information);
    }, [props]);

    const listConstructor = (items) => {
        if (items !== undefined) {
            if (items.length == 0) {
                return <div>검색결과가 없습니다 !</div>;
            }
            return items.map((item) => {
                return (
                    <div className={styles.item}>
                        <p
                            className={styles.name}
                            onClick={() => {
                                onClickItem(item);
                            }}
                        >
                            {item.name}
                        </p>
                        <p className={styles.address}>{item.address}</p>
                        <hr />
                    </div>
                );
            });
        }
    };
    return (
        <>
            <Tabs
                defaultIndex={defaultTab}
                className={styles.tabs}
                selectedTabClassName={styles.is_selected}
                onSelect={(index) => {
                    setSelectedTab({
                        main: idx[index],
                    });
                }}
            >
                <TabList>
                    <Tab className={styles.tab}>전체</Tab>
                    <Tab className={styles.tab}>음식점</Tab>
                    <Tab className={styles.tab}>여행지</Tab>
                </TabList>
                <TabPanel>
                    <div className={styles.tabpanel_all}>{listConstructor(data)}</div>
                </TabPanel>
                <TabPanel>
                    <Tabs
                        onSelect={(index) => {
                            setSelectedTab({ main: '음식점', sub: restaurant[index] });
                        }}
                        forceRenderTabPanel
                        className={styles.tabs}
                        selectedTabClassName={styles.sub_is_selected}
                    >
                        <TabList className={styles.subtab_list}>
                            <Tab className={styles.subtab_rest}>전체</Tab>
                            <Tab className={styles.subtab_rest}>한식</Tab>
                            <Tab className={styles.subtab_rest}>양식</Tab>
                            <Tab className={styles.subtab_rest}>일식</Tab>
                            <Tab className={styles.subtab_rest}>중식</Tab>
                            <Tab className={styles.subtab_rest}>기타</Tab>
                        </TabList>
                        <div className={styles.tabpanel}>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                        </div>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                    <Tabs
                        forceRenderTabPanel
                        onSelect={(index) => setSelectedTab({ main: '여행지', sub: tour[index] })}
                        className={styles.tabs}
                        selectedTabClassName={styles.sub_is_selected}
                    >
                        <TabList className={styles.subtab_list}>
                            <Tab className={styles.subtab_tour}>전체</Tab>
                            <Tab className={styles.subtab_tour}>문화시설</Tab>
                            <Tab className={styles.subtab_tour}>행사/공연/축제</Tab>
                            <Tab className={styles.subtab_tour}>쇼핑</Tab>
                        </TabList>
                        <div className={styles.tabpanel}>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
                        </div>
                    </Tabs>
                </TabPanel>
            </Tabs>
        </>
    );
}

export default TabMenu;
