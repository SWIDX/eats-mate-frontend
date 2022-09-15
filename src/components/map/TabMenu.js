import { React, useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './TabMenu.module.css';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import { ReactComponent as NoDataMark } from '../../images/svg/mark.svg';
import { SearchContext } from '../../context/SearchContext';
import { MarkerContext } from '../../context/MarkerContext';

function TabMenu(props) {
    const SERVER = "eats-mate.com:8081"
    const [selectedTab, setSelectedTab] = useState();
    const [tabData, setTabData] = useState([]);
    const [data, setData] = useState();
    const { searchInformation } = useContext(SearchContext);
    const { markerInformation, setMarkerInformation } = useContext(MarkerContext);

    let tabRef = null;

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
        1: '관광지',
        2: '문화시설',
        3: '행사/공연/축제',
        4: '쇼핑',
    };

    const onClickItem = async (item) => {
        let data = {};

        if (item.type == '음식점') {
            const url = 'https://' + SERVER + '/map-service/getRestInfo?id=';
            data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
        } else if (item.type == '여행지') {
            const url = 'https://' + SERVER + '/map-service/getTourInfo?id=';
            data = await axios.get(url + item.id).then((res) => {
                return res.data;
            });
        }

        if (data) {
            props.setClickedInformation({
                type: item.type,
                information: data,
            });
        }
    };

    useEffect(() => {
        if (data && selectedTab !== undefined) {
            let items;

            if (selectedTab.main !== '전체' && selectedTab.sub == undefined) {
                items = data.filter((item) => item.type == selectedTab.main);
            } else {
                if (selectedTab.main == '전체') {
                    items = data;
                    //console.log(items);
                } else if (selectedTab.sub != '전체') {
                    items = data.filter((item) => item.gubun == selectedTab.sub);
                } else {
                    items = data.filter((item) => item.type == selectedTab.main);
                }
            }
            setMarkerInformation({ marker: items });
            setTabData(items);
        }
    }, [selectedTab]);

    useEffect(() => {
        setData([]); // 초기화

        const selectedIdx = searchInformation.value == '전체' ? 0 : searchInformation.value == '여행지' ? 1 : 2;

        if (tabRef) {
            switch (selectedIdx) {
                case 0:
                    tabRef.firstElementChild.firstElementChild.click();
                    break;
                case 1:
                    tabRef.firstElementChild.lastElementChild.click();
                    break;
                case 2:
                    tabRef.firstElementChild.firstElementChild.nextSibling.click();
                    break;
            }
        }

        if (props.information.length == 0) {
            setTabData([]);
            setData([]);
        } else {
            setMarkerInformation({ marker: props.information });
            setData(props.information);
            setSelectedTab({
                main: props.selectedType,
            });
        }
    }, [props.information]);

    useEffect(() => {
        //console.log(searchInformation);
    }, [searchInformation]);

    const listConstructor = (items) => {
        if (items !== undefined) {
            if (items.length == 0) {
                return (
                    <>
                        <div className={styles.markOuter}>
                            <ul>
                                <NoDataMark />
                            </ul>
                            <ul className={styles.marktext}>검색결과가 없습니다</ul>
                            <ul className={styles.marktext}>다른 키워드로 검색해보세요</ul>
                        </div>
                    </>
                );
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
                defaultIndex={searchInformation.value == '전체' ? 0 : searchInformation.value == '음식점' ? 1 : 2}
                className={styles.tabs}
                selectedTabClassName={styles.is_selected}
                onSelect={(index) => {
                    setSelectedTab({
                        main: idx[index],
                    });
                }}
                domRef={(node) => (tabRef = node)}
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
                            <Tab className={styles.subtab_tour}>관광지</Tab>
                            <Tab className={styles.subtab_tour}>문화시설</Tab>
                            <Tab className={styles.subtab_tour}>행사/공연/축제</Tab>
                            <Tab className={styles.subtab_tour}>쇼핑</Tab>
                        </TabList>
                        <div className={styles.tabpanel}>
                            <TabPanel>{listConstructor(tabData)}</TabPanel>
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
