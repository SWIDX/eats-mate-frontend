import React from 'react';
import MainSearchBar from '../components/etc/MainSearchBar';
import NavBar from '../components/navigation/NavBar';
import RecentReview from "../components/review/RecentReview";

function MainPage() {
  return (
    <>
      <NavBar />
      <MainSearchBar />
      <RecentReview />
    </>
  );
}

export default MainPage;
