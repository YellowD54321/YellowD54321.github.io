import "./homePage.css";
import React, { useState, useRef } from "react";
import logoIconImage from "../../assets/images/Logo/Logo-icon-only.png";
import avatarImage from "../../assets/images/avatar/avatar.png";

function HomePage() {
  const rotateRegionRef = useRef(null);
  const avatarRef = useRef(null);
  const nextDrinkRef = useRef(null);

  function handleMouseOverImage() {
    rotateRegionRef.current.classList.add("home-page-stop-rotate");
    avatarRef.current.classList.add("home-page-stop-rotate");
    nextDrinkRef.current.classList.add("home-page-stop-rotate");
  }

  function handleMouseOutImage() {
    rotateRegionRef.current.classList.remove("home-page-stop-rotate");
    avatarRef.current.classList.remove("home-page-stop-rotate");
    nextDrinkRef.current.classList.remove("home-page-stop-rotate");
  }

  return (
    <div className="home-page-body">
      <div className="home-page-main">
        <div className="home-page-avatar-position">
          <div className="home-page-rotate-region" ref={rotateRegionRef}>
            <div className="home-page-avatar" ref={avatarRef}></div>
            <div
              className="home-page-next-drink"
              ref={nextDrinkRef}
              onMouseOver={handleMouseOverImage}
              onMouseOut={handleMouseOutImage}
            >
              <img
                className="home-page-next-drink-image"
                src={logoIconImage}
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
