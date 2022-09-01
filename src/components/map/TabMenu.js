import { React, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./TabMenu.module.css";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

function TabMenu(props) {
  const [defaultTab, setDefaultTab] = useState(1);
  const [selectedTab, setSelectedTab] = useState();
  const [tabData, setTabData] = useState([]);
  const [data, setData] = useState([]);
  const [standardInfo, setStandardInfo] = useState({});

  const restaurant = {
    0: "전체",
    1: "한식",
    2: "양식",
    3: "일식",
    4: "중식",
    5: "기타",
  };

  const tour = {
    0: "전체",
    1: "문화시설",
    2: "행사/공연/축제",
    3: "쇼핑",
  };

  const onClickItem = (item) => {
    props.propFunction(item);
  };

  const nearByTourInformation = async (position) => {
    //let data = axios.get()
    //nearyByTourInformation
    //backend 수정 후 추가 할 예정
  };

  useEffect(() => {
    setData(props.information);
    setStandardInfo(props.information[0]);
  }, [props.information]);

  useEffect(() => {
    if (selectedTab !== undefined) {
      if (selectedTab.main == "음식점") {
        let item = [];
        if (selectedTab.sub == "전체") {
          item = data;
        } else {
          item = data.filter((info) => info.gubun == selectedTab.sub);
        }
        setTabData(item);
      }
      if (selectedTab.main == "관광지") {
        let item = [];
        if (selectedTab.sub == "전체") {
          nearByTourInformation({
            lat: standardInfo.lat,
            lng: standardInfo.lng,
          });
        }
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    if (data) {
      setTabData(data);
    }
  }, [data]);

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
      >
        <TabList>
          <Tab className={styles.tab}>전체</Tab>
          <Tab className={styles.tab}>음식점</Tab>
          <Tab className={styles.tab}>여행지</Tab>
        </TabList>
        <TabPanel>
          <Tabs
            onSelect={(index) =>
              index == 0
                ? setSelectedTab({ main: "전체", sub: "음식점" })
                : setSelectedTab({ main: "전체", sub: "관광지" })
            }
            forceRenderTabPanel
            className={styles.tabs}
            selectedTabClassName={styles.sub_is_selected}
          >
            <TabList className={styles.subtab_list}>
              <Tab className={styles.subtab_all}>음식점</Tab>
              <Tab className={styles.subtab_all}>관광지</Tab>
            </TabList>
            <TabPanel>
              <p>음식점 데이터</p>
            </TabPanel>
            <TabPanel>
              <p>관광지데이터</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs
            onSelect={(index) =>
              setSelectedTab({ main: "음식점", sub: restaurant[index] })
            }
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
            onSelect={(index) =>
              setSelectedTab({ main: "관광지", sub: tour[index] })
            }
            className={styles.tabs}
            selectedTabClassName={styles.sub_is_selected}
          >
            <TabList className={styles.subtab_list}>
              <Tab className={styles.subtab_tour}>전체</Tab>
              <Tab className={styles.subtab_tour}>문화시설</Tab>
              <Tab className={styles.subtab_tour}>행사/공연/축제</Tab>
              <Tab className={styles.subtab_tour}>쇼핑</Tab>
            </TabList>
            <TabPanel>
              <p>전체 관광지 데이터</p>
            </TabPanel>
            <TabPanel>
              <p>문화시설</p>
            </TabPanel>
            <TabPanel>
              <p>행사/공연/축제</p>
            </TabPanel>
            <TabPanel>
              <p>쇼핑</p>
            </TabPanel>
            <TabPanel>
              <p>기타 음식 데이터</p>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default TabMenu;
