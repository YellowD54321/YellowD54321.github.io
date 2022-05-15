import "./homePage.css";
import React, { useState, useRef } from "react";
import nextDrinkIconImage from "../../assets/images/logo/logo-icon-only.png";
import pomodorosIconImage from "../../assets/images/logo/pomodoros-logo-icon-only.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const rotateRegionRef = useRef(null);
  const avatarRef = useRef(null);
  const nextDrinkRef = useRef(null);
  const weatherPomodorosRef = useRef(null);
  const currentUrl = document.URL;

  function handleMouseOverImage() {
    rotateRegionRef.current.classList.add("home-page-stop-rotate");
    avatarRef.current.classList.add("home-page-stop-rotate");
    nextDrinkRef.current.classList.add("home-page-stop-rotate");
    weatherPomodorosRef.current.classList.add("home-page-stop-rotate");
  }

  function handleMouseOutImage() {
    rotateRegionRef.current.classList.remove("home-page-stop-rotate");
    avatarRef.current.classList.remove("home-page-stop-rotate");
    nextDrinkRef.current.classList.remove("home-page-stop-rotate");
    weatherPomodorosRef.current.classList.remove("home-page-stop-rotate");
  }

  function goToResume() {
    window
      .open(
        "https://docs.google.com/document/d/19oWqKWlqAzksdhurIO96a3zl-Xhmg2Hh6byC8paxSCs/edit",
        "_blank"
      )
      .focus();
  }

  function goToNextDrinkMainPage() {
    // window.open(currentUrl + "nextDrink/mainPage", "_blank").focus();
    navigate("/nextDrink/mainPage");
  }

  function goToWeatherPomodorosPage() {
    // window.open(currentUrl + "weatherPomodoros/pomodoros", "_blank").focus();.
    navigate("/weatherPomodoros/pomodoros");
  }

  return (
    <div className="home-page-body">
      <div className="home-page-main">
        <div className="home-page-avatar-position">
          <div className="home-page-rotate-region" ref={rotateRegionRef}>
            <div
              className="home-page-avatar"
              title="About Me"
              ref={avatarRef}
              onClick={goToResume}
            ></div>
            <div
              className="home-page-project-avatar home-page-next-drink"
              title="Go to Next Drink Website"
              ref={nextDrinkRef}
              onMouseOver={handleMouseOverImage}
              onMouseOut={handleMouseOutImage}
              onClick={goToNextDrinkMainPage}
            >
              <img
                className="home-page-project-avatar-image home-page-next-drink-image"
                src={nextDrinkIconImage}
                alt=""
              />
            </div>
            <div
              className="home-page-project-avatar home-page-pomodoros"
              title="Go to Weather Pomodoros Website(Still Building)"
              ref={weatherPomodorosRef}
              onMouseOver={handleMouseOverImage}
              onMouseOut={handleMouseOutImage}
              onClick={goToWeatherPomodorosPage}
            >
              <img
                className="home-page-project-avatar-image home-page-pomodoros-image"
                src={pomodorosIconImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
