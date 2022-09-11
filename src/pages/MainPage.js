import React from 'react';
import Carousel from '../components/etc/Carousel';
import NavBar from '../components/navigation/NavBar';
import MobileNavBar from '../components/navigation/mobile/MobileNavBar';
import RecommendedList from '../components/etc/RecommendedList';
import RecentReview from "../components/review/RecentReview";
import { useMediaQuery } from "react-responsive"

function MainPage() {
  const isPc = useMediaQuery({ query: "(min-width:426px)" });
  const isMobile = useMediaQuery({ query: "(max-width:426px)" });

  const testData = [
    {
      image: "img/main-carousel/main-carousel-1.png",
      link: "/about"
    },
    {
      image: "img/main-carousel/main-carousel-2.png",
      link: "/map-service/main"
    },
    {
      image: "img/slideImg1.png",
      link: "/mypage"
    }
  ];

  return (
    <>
      {isPc && <NavBar />}
      {isMobile && <MobileNavBar />}
      <Carousel
        dataList={testData}
        outerViewWidth={"900px"}
        outerViewHeight={"400px"}
        imageWidth={"100%"}
        imageHeight={"100%"}
        imageRadius={15}
        gap={100}
        innerViewOverflow={"visible"}
        buttonSize={70}
        scrollStep={"full"}
        autoScroll={true}
        showBullets={true}
      />
      <Carousel
        dataList={testData}
        outerViewWidth={"580px"}
        outerViewHeight={"200px"}
        imageWidth={"200px"}
        imageHeight={"200px"}
        imageRadius={5}
        gap={40}
        innerViewOverflow={"hidden"}
        buttonSize={50}
        scrollStep={"one"}
        autoScroll={false}
        showBullets={false}
      />
      <RecommendedList />
      <RecentReview />
    </>
  );
}

export default MainPage;
