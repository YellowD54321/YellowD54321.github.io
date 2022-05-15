import React, { useState, useRef } from "react";
import "./signUpPage.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//Build Sign up page content.
function SignUpPage() {
  const userEmailRef = useRef("");
  const userPasswordRef = useRef("");
  const [signUpFailInfo, setSignUpFailInfo] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const webName = "Next Drink";

  //Sign up by information type in form.
  function handleSignUp() {
    const userEmail = userEmailRef?.current?.value;
    const userPassword = userPasswordRef?.current?.value;
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setSignUpFailInfo("");
        console.log("SIGNUP SUCCESSFUL!");
        navigate("/nextDrink");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorMessage);
        if (
          errorMessage.includes("invalid-email") ||
          errorMessage.includes("user-not-found") ||
          errorMessage.includes("wrong-password")
        ) {
          setSignUpFailInfo("Email or Password invalid");
          console.log("loginFailInfo = " + signUpFailInfo);
        }
      });
  }

  return (
    <div className="signUp-page-body">
      <form className="signUp-page-form" autoComplete="off">
        <img className="signUp-page-logo" src="./images/Logo/Logo.png" alt="" />
        <h2 className="signUp-page-welcome-text">Sign Up {webName}</h2>
        <div className="signUp-page-input-region signUp-page-email-region">
          <input
            className="signUp-page-email"
            type="text"
            name="email"
            ref={userEmailRef}
            required
          />
          <label htmlFor="email" className="signUp-page-label-email">
            <span className="signUp-page-content signUp-page-content-email">
              Email Address
            </span>
          </label>
        </div>
        <div className="signUp-page-input-region signUp-page-password-region">
          <input
            className="signUp-page-password"
            type="password"
            name="password"
            ref={userPasswordRef}
            required
          />
          <label htmlFor="password" className="signUp-page-label-password">
            <span className="signUp-page-content signUp-page-content-password">
              Password
            </span>
          </label>
        </div>
        <p className="signUp-page-fail-info">{signUpFailInfo}</p>
        <button
          className="signUp-page-signUp-btn"
          type="button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
export default SignUpPage;
