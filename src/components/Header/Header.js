import React, { useState, useRef, useEffect } from "react";
import { useStateValue } from "../Reducer/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import myFavouriteIcon from "../../assets/images/icons/myfavourite-icon.png";
// import logoImage from "../../assets/images/logo/logo.png";
import logoImage from "../../assets/images/icons/logo.png";
import searchIcon from "../../assets/images/icons/search-icon.png";
import diceIcon from "../../assets/images/icons/dice-icon.png";
import loginIcon from "../../assets/images/icons/login-icon.png";

//Build Header content.
function Header() {
  const searchBarRef = useRef("");
  const [{ searchBtnCount, user }, dispatch] = useStateValue();
  const userEmailName = user?.email?.match(/[^@]*/i)[0];
  const navigate = useNavigate();
  const accountNavBarRef = useRef(null);
  const [styleOpacity, setStyleOpacity] = useState(1);

  //Check window scroll to switch opacity when page is scrolling down.
  useEffect(() => {
    window.addEventListener("scroll", switchOpacity);
    return () => {
      window.removeEventListener("scroll", switchOpacity);
    };
  }, []);

  //Change opacity when page is scrolling down.
  const switchOpacity = () => {
    // if (window.outerWidth >= 1024) {
    if (window.scrollY >= 100) {
      setStyleOpacity(0.7);
    } else {
      setStyleOpacity(1);
    }
    // }
  };

  //Save search text to reducer to make other componenet be able to use it.
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
    navigate(`/nextDrink/searchPage/search?q=${searchInputUrl}`);
  };

  //Be albe to press Enter to start searching.
  function searchBarOnKeyUp(event) {
    if (event.key === "Enter") {
      startSearching();
    }
  }

  //Trigger when 'Dice' image is clicked.
  //Save search text as 'random' for searching a random cocktail.
  function startRandomDice() {
    const btnCounter = searchBtnCount >= 0 ? searchBtnCount + 1 : 0;
    navigate("/nextDrink/searchPage/search?=random");
    dispatch({
      type: "SEARCH_TEXT",
      item: {
        text: "random",
        btnCounter: btnCounter,
      },
    });
  }

  //When account button is clicked,
  //Go to log in page if not log in yet.
  //Log out if log in already.
  function handleLogClick() {
    const auth = getAuth();

    if (isLogIn()) {
      handleLogOut(auth);
    } else {
      handleLogIn();
    }
  }

  //Log out account.
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

  //Go to log in page.
  function handleLogIn() {
    navigate("/nextDrink/loginPage");
  }

  //Go to home page when logo image is clicked.
  function handleLogoClick() {
    navigate("/nextDrink/mainPage");
  }

  //Toggle class of account button to change it's style when it is clicked.
  //Only work in small mode (window width less than 1023px).
  function headerAccountButtonOnClick() {
    if (isLogIn()) {
      const accountInfoWindow = accountNavBarRef?.current;
      accountInfoWindow.classList.toggle("header-account-small-navBar-clicked");
      // if (
      //   accountInfoWindow.classList.contains(
      //     "header-account-small-navBar-clicked"
      //   )
      // ) {
      //   accountInfoWindow.classList.remove(
      //     "header-account-small-navBar-clicked"
      //   );
      // } else {
      //   accountInfoWindow.classList.add("header-account-small-navBar-clicked");
      // }
    } else {
      handleLogIn();
    }
  }

  //Check whether log in.
  function isLogIn() {
    return !!user;
  }

  //Go to favourite page when favourite image is clicked.
  function handleFavouriteClick() {
    navigate("/nextDrink/favouritePage");
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
