import React from "react";

const TopNav = () => {
  return (
    <nav>
      <p>Welcome in our HouseHold Account</p>
      <img src="#" alt="Family-logo" />
      <form className="login" action="">
        <input
          type="text"
          placeholder="user"
          class="login__input login__input--user"
        />

        <input
          type="password"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin"
        />
        <button class="login__btn">&rarr;</button>
      </form>
    </nav>
  );
};

export default TopNav;
