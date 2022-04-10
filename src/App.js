import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const WholeMainPage = () => {
    return (
      <div>
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
  const WholeSearchPage = () => {
    return (
      <div>
        <Header />
        <SearchPage />
      </div>
    );
  };
  const WholeProductPage = () => {
    return (
      <div>
        <Header />
        <ProductPage />
      </div>
    );
  };
  const WholeFavouritePage = () => {
    return (
      <div>
        <Header />
        <FavouritePage />
      </div>
    );
  };

  const auth = getAuth();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USE iS >>> ", authUser);
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

  useEffect(() => {
    if (!user) return;
    async function loadDb() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const newFavouriteList = userData.favouriteList;
        dispatch({
          type: "FAVOURITE_LIST",
          item: {
            favouriteList: newFavouriteList,
          },
        });
        console.log("Document data:", userData);
      } else {
        console.log(`No Document named: ${user.uid}`);
      }
    }
    loadDb();
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WholeMainPage />}></Route>
        <Route path="/searchPage/*" element={<WholeSearchPage />}></Route>
        <Route path="/productPage/*" element={<WholeProductPage />}></Route>
        <Route path="/favouritePage" element={<WholeFavouritePage />}></Route>
        <Route path="/loginPage" element={<LoginPage />}></Route>
        <Route path="/signUpPage" element={<SignUpPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
