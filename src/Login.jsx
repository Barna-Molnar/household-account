import React, { Component } from "react";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pin: "",
    };
  }
  render() {
    return (
      <div
        className="login-page"
        style={{ display: this.props.loginVisibility ? "" : "none" }}
      >
        <div className="login-page__form">
          <form className="login-form">
            <input
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              value={this.state.username}
              type="text"
              placeholder="username"
            />
            <input
              onChange={(e) => {
                this.setState({ pin: e.target.value });
              }}
              value={this.state.pin}
              maxLength="4"
              type="password"
              placeholder="password"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                this.props.login(this.state.username, this.state.pin);
                this.setState({
                  username: "",
                  pin: "",
                });
              }}
            >
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
