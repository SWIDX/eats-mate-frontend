import React from 'react';
import Carousel from '../components/etc/Carousel';
import MobileCarousel from '../components/etc/mobile/MobileCarousel';
import NavBar from '../components/navigation/NavBar';
import MobileNavBar from '../components/navigation/mobile/MobileNavBar';
import RecommendedList from '../components/etc/RecommendedList';
import RecentReview from "../components/review/RecentReview";
import { useMediaQuery } from "react-responsive"
import { Container } from 'react-bootstrap';

function MainPage() {
  const isPc = useMediaQuery({ query: "(min-width:426px)" });
  const isMobile = useMediaQuery({ query: "(max-width:426px)" });

  const pcCarouselData = [
    {
      image: "img/main-carousel/main-carousel-1.png",
      link: "/map"
    },
    {
      image: "img/main-carousel/main-carousel-2.png",
      link: "/about"
    },
    {
      image: "img/main-carousel/main-carousel-3.png",
      link: "/detail/성수완당 본점"
    }
  ];
  const mobileCarouselData = [
    {
      image: "img/main-carousel/main-carousel-mobile-1.png",
      link: "/map"
    },
    {
      image: "img/main-carousel/main-carousel-mobile-2.png",
      link: "/about"
    },
    {
      image: "img/main-carousel/main-carousel-mobile-3.png",
      link: "/detail/성수완당 본점"
    }
  ];

  return (
    <>
      {isPc && <NavBar />}
      {isMobile && <MobileNavBar />}
      {isPc &&
      <Carousel
        dataList={pcCarouselData}
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
      }
      {isMobile &&
      <MobileCarousel
        dataList={mobileCarouselData}
        width={"90vw"}
        height={"50vw"}
        imageRadius={15}
        gap={0}
        innerViewOverflow={"hidden"}
        scrollStep={"full"}
        autoScroll={true}
        showBullets={true}
      />
      }
      {/* <Carousel
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
      /> */}
      {isPc &&
      <Container fluid="xxl" style={{ width: "75%", height: "100%", padding: "50px 0px 100px 0px"}}>
        <RecommendedList />
        <RecentReview />
      </Container>
      }
      {isMobile &&
      <Container fluid="xxl" style={{ width: "100%", height: "100%", padding: "20px 0px 100px 0px"}}>
        <RecommendedList />
        <RecentReview />
      </Container>
      }
    </>
  );
}

export default MainPage;
