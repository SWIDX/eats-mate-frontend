import { React, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./TabMenu.module.css";
import "react-tabs/style/react-tabs.css";

function TabMenu(props) {
  const [defaultTab, setDefaultTab] = useState(1);
  const [selectedTab, setSelectedTab] = useState();
  const [tabData, setTabData] = useState([]);
  const [data, setData] = useState([]);

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
    1: "쇼핑몰",
    2: "유적지",
    3: "일식",
    4: "중식",
    5: "기타",
  };

  const onClickItem = (item) => {
    props.propFunction(item);
  };

  useEffect(() => {
    setData(props.information);
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
      <Tabs defaultIndex={defaultTab}>
        <TabList>
          <Tab>전체</Tab>
          <Tab>음식점</Tab>
          <Tab>여행지</Tab>
        </TabList>
        <TabPanel>
          <Tabs
            onSelect={(index) =>
              index == 0
                ? setSelectedTab({ main: "전체", sub: "음식점" })
                : setSelectedTab({ main: "전체", sub: "관광지" })
            }
            forceRenderTabPanel
          >
            <TabList>
              <Tab>음식점</Tab>
              <Tab>관광지</Tab>
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
          >
            <TabList>
              <Tab>전체</Tab>
              <Tab>한식</Tab>
              <Tab>양식</Tab>
              <Tab>일식</Tab>
              <Tab>중식</Tab>
              <Tab>기타</Tab>
            </TabList>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
            <TabPanel>{listConstructor(tabData)}</TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>전체</Tab>
              <Tab>쇼핑몰</Tab>
              <Tab>양식</Tab>
              <Tab>일식</Tab>
              <Tab>중식</Tab>
            </TabList>
            <TabPanel>
              <p>전체 음식 데이터</p>
            </TabPanel>
            <TabPanel>
              <p>한식 데이터</p>
            </TabPanel>
            <TabPanel>
              <p>양식데이터</p>
            </TabPanel>
            <TabPanel>
              <p>일식데이터</p>
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
