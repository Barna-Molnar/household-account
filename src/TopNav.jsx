import React from "react";
import "./TopNav.scss";

const TopNav = () => {
  return (
    <nav>
      <p className="welcome">Welcome in our HouseHold Account</p>
      <img src="/img/logo.png" alt="" className="logo" />
      <form className="loginForm" action="">
        <input
          type="text"
          placeholder="username"
          className="loginForm__input loginForm__input--user"
        />

        <input
          type="password"
          placeholder="pin"
          maxLength="4"
          className="loginForm__input loginForm__input--pin"
        />
        <button className="loginForm__btn">
          LOG IN <span>&rarr;</span>
        </button>
      </form>
    </nav>
  );
};

export default TopNav;
