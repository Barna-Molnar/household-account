import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import React from "react";
import { accounts } from "./data.js";
import { login } from "./login.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(username, pin) {
    this.setState({
      currentAcc: login(username, pin),
    });
  }
  render() {
    return (
      <div className="App">
        <TopNav currentAcc={this.state.currentAcc} login={this.handleLogin} />
        <Account currentAcc={this.state.currentAcc} />
      </div>
    );
  }
}

export default App;
