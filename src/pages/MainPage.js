import React from 'react';
import MainSlideBar from '../components/etc/MainSlideBar';
import NavBar from '../components/navigation/NavBar';
import RecommendedList from '../components/etc/RecommendedList';
import RecentReview from "../components/review/RecentReview";

function MainPage() {
  return (
    <>
      <NavBar />
      <MainSlideBar />
      <RecommendedList />
      <RecentReview />
    </>
  );
}

export default MainPage;
