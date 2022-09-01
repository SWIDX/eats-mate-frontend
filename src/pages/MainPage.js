import React from 'react';
import MainSearchBar from '../components/etc/MainSearchBar';
import MainSlideBar from '../components/etc/MainSlideBar';
import NavBar from '../components/navigation/NavBar';
import RecommendedList from '../components/etc/RecommendedList';
import RecentReview from "../components/review/RecentReview";

function MainPage() {
  return (
    <>
      <NavBar />
      <MainSlideBar />
      <MainSearchBar />
      <RecommendedList />
      <RecentReview />
    </>
  );
}

export default MainPage;
