import React from "react";
import "./TopNav.scss";

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pin: "",
    };
  }
  render() {
    return (
      <nav>
        <p className="welcome">
          {this.props.currentAcc === undefined
            ? "Welcome in our HouseHold Account"
            : `Welcome back ${this.props.currentAcc.owner.split(" ")[0]}`}
        </p>
        <img src="/img/logo.png" alt="" className="logo" />
        <form className="loginForm" action="">
          <input
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}
            value={this.state.username}
            type="text"
            placeholder="username"
            className="loginForm__input loginForm__input--user"
          />

          <input
            onChange={(e) => {
              this.setState({ pin: e.target.value });
            }}
            value={this.state.pin}
            type="password"
            placeholder="pin"
            maxLength="4"
            className="loginForm__input loginForm__input--pin"
          />
          <button
            className="loginForm__btn"
            onClick={(e) => {
              e.preventDefault();
              this.props.login(this.state.username, this.state.pin);
              this.setState({
                username: "",
                pin: "",
              });
            }}
          >
            LOG IN <span>&rarr;</span>
          </button>
        </form>
      </nav>
    );
  }
}

export default TopNav;
