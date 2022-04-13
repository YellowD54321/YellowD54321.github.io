import React, { useState, useRef, useEffect } from "react";
import { useStateValue } from "../Reducer/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import myFavouriteIcon from "../../assets/images/icons/myfavourite-icon.png";
import logoImage from "../../assets/images/Logo/Logo.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import diceIcon from "../../assets/images/icons/dice-icon.png";
import loginIcon from "../../assets/images/icons/login-icon.png";

function Header() {
  const searchBarRef = useRef("");
  const [{ searchBtnCount, user }, dispatch] = useStateValue();
  const userEmailName = user?.email?.match(/[^@]*/i)[0];
  const navigate = useNavigate();
  const accountNavBarRef = useRef(null);
  const [styleOpacity, setStyleOpacity] = useState(1);

  useEffect(() => {
    window.addEventListener("scroll", switchOpacity);
    return () => {
      window.removeEventListener("scroll", switchOpacity);
    };
  }, []);

  const switchOpacity = () => {
    if (window.outerWidth >= 1024) {
      if (window.scrollY >= 100) {
        setStyleOpacity(0.7);
      } else {
        setStyleOpacity(1);
      }
    }
  };

  const startSearching = () => {
    const searchInput = searchBarRef?.current?.value;
    const btnCounter = searchBtnCount >= 0 ? searchBtnCount + 1 : 0;
    const searchInputUrl = searchInput.replace(/ /gi, "+");

    dispatch({
      type: "SEARCH_TEXT",
      item: {
        text: searchInput,
        btnCounter: btnCounter,
      },
    });
    navigate(`/searchPage/search?q=${searchInputUrl}`);
  };

  function searchBarOnKeyUp(event) {
    if (event.key === "Enter") {
      startSearching();
    }
  }

  function startRandomDice() {
    const btnCounter = searchBtnCount >= 0 ? searchBtnCount + 1 : 0;
    navigate("/searchPage/search?=random");
    dispatch({
      type: "SEARCH_TEXT",
      item: {
        text: "random",
        btnCounter: btnCounter,
      },
    });
  }

  function handleLogClick() {
    const auth = getAuth();

    if (isLogIn()) {
      handleLogOut(auth);
    } else {
      handleLogIn();
    }
  }

  function handleLogOut(auth) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("LOGOUT SUCCESSFUL!");
      })
      .catch((error) => {
        // An error happened.
        const errorMessage = error.message;
        console.log("log out fail information = " + errorMessage);
      });
  }

  function handleLogIn() {
    navigate("/loginPage");
  }

  function handleLogoClick() {
    navigate("/");
  }

  function headerAccountButtonOnClick() {
    if (isLogIn()) {
      const accountInfoWindow = accountNavBarRef?.current;
      if (
        accountInfoWindow.classList.contains(
          "header-account-small-navBar-clicked"
        )
      ) {
        accountInfoWindow.classList.remove(
          "header-account-small-navBar-clicked"
        );
      } else {
        accountInfoWindow.classList.add("header-account-small-navBar-clicked");
      }
    } else {
      handleLogIn();
    }
  }

  function isLogIn() {
    return !!user;
  }

  function handleFavouriteClick() {
    navigate("/favouritePage");
  }

  return (
    <header style={{ opacity: styleOpacity }}>
      <div className="header-left">
        <img
          className="header-logo"
          src={logoImage}
          alt="Next Drink"
          onClick={handleLogoClick}
        />
      </div>
      <div className="header-middle">
        <div className="header-search-bar-region">
          <input
            className="header-search-bar"
            type="text"
            placeholder="Cocktail name"
            ref={searchBarRef}
            onKeyUp={searchBarOnKeyUp}
          />
          <img
            className="header-search-bar-img"
            src={searchIcon}
            alt=""
            onClick={startSearching}
          />
        </div>
        <img
          className="header-random-cocktail-img"
          src={diceIcon}
          alt="Try a random cocktail!"
          title="Try a random cocktail!"
          onClick={startRandomDice}
        />
      </div>
      <nav className="header-right">
        <ul>
          <li className="header-myfavourite">
            <img
              className="header-myfavourite-img"
              src={myFavouriteIcon}
              alt="My Favourite Cocktail"
              title="My Favourite Cocktail"
              style={{ display: user ? "block" : "none" }}
              onClick={handleFavouriteClick}
            />
          </li>
          <li className="header-account">
            <p>Hello {user ? userEmailName : `Guest!`}</p>
            <button
              className="header-signIn-signOut-btn"
              onClick={handleLogClick}
            >
              {user ? `Log out` : `Log in`}
            </button>
          </li>
          <li className="header-account-small">
            <button
              className="header-account-info-btn"
              onClick={headerAccountButtonOnClick}
            >
              {user ? userEmailName?.toUpperCase().split("")[0] : ""}
              <img
                className="header-login-img"
                src={loginIcon}
                alt=""
                style={{ display: user ? "none" : "block" }}
              />
            </button>
            <ul
              className="header-account-small-navBar"
              id="header-account-small-navBar"
              ref={accountNavBarRef}
            >
              <li className="header-account-small-account-info">
                {/* no guest here */}
                Hello {user ? userEmailName : `Guest!`}
              </li>
              <li className="header-myfavourite">
                <img
                  className="header-myfavourite-img"
                  src={myFavouriteIcon}
                  alt="My Favourite Cocktail"
                  title="My Favourite Cocktail"
                  onClick={handleFavouriteClick}
                />
              </li>
              <li>
                <button
                  className="header-signIn-signOut-btn"
                  onClick={handleLogClick}
                >
                  Log out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
