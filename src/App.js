import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { setDoc, getDoc, collection, doc } from "firebase/firestore";
import { useStateValue } from "./components/Reducer/StateProvider";
import viewRegionReducer, {
  initialState,
} from "./components/MainPage/MainPageReducer/ViewRegionReducer";
import { ViewRegionProvider } from "./components/MainPage/MainPageReducer/ViewRegionContext.js";
import Header from "./components/Header/Header.js";
// import TesterScroll from "./components/MainPage/TesterScroll.js";
import MainPage from "./components/MainPage/MainPage.js";
import SearchPage from "./components/SearchPage/SearchPage.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
// import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage.js";
import SignUpPage from "./components/LoginPage/SignUpPage.js";
import FavouritePage from "./components/FavouritePage/FavouritePage.js";
import HomePage from "./components/HomePage/HomePage";
import Pomodoros from "./components/WeatherPomodoros/PomodorosPage/PomodorosPage";

function App() {
  //Combine Header and Main Page
  const WholeMainPage = () => {
    return (
      <div className="main-page-whole-page">
        <Header />
        <ViewRegionProvider
          initialState={initialState}
          reducer={viewRegionReducer}
        >
          <MainPage />
        </ViewRegionProvider>
      </div>
    );
  };
  //Combine Header and Search Page
  const WholeSearchPage = () => {
    return (
      <div className="main-page-whole-page">
        <Header />
        <SearchPage />
      </div>
    );
  };
  //Combine Header and Single Cocktail Page
  const WholeProductPage = () => {
    return (
      <div className="main-page-whole-page">
        <Header />
        <ProductPage />
      </div>
    );
  };
  //Combine Header and Favourite Page.
  const WholeFavouritePage = () => {
    return (
      <div className="main-page-whole-page">
        <Header />
        <FavouritePage />
      </div>
    );
  };

  //Get account information from Firebase.
  const auth = getAuth();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/nextDrink/mainPage" element={<WholeMainPage />}></Route>
        <Route
          path="/nextDrink/searchPage/*"
          element={<WholeSearchPage />}
        ></Route>
        <Route
          path="/nextDrink/productPage/*"
          element={<WholeProductPage />}
        ></Route>
        <Route
          path="/nextDrink/favouritePage"
          element={<WholeFavouritePage />}
        ></Route>
        <Route path="/nextDrink/loginPage" element={<LoginPage />}></Route>
        <Route path="/nextDrink/signUpPage" element={<SignUpPage />}></Route>
        <Route
          path="/weatherPomodoros/pomodoros"
          element={<Pomodoros />}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
