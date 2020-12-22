import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import React from "react";
import { accounts, calcValue } from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
      accounts: accounts,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLend = this.handleLend.bind(this);
  }
  handleLogin(username, pin) {
    this.setState({
      currentAcc: this.state.accounts.find((acc) => acc.username === username),
    });
  }
  handleLend(fromAcc, forAcc, amount) {
    const arr = accounts.find((acc) => acc.username === fromAcc);
    this.setState((prev, props) => {
      console.log(prev.currentAcc.movements.concat(-amount));
      console.log(prev.currentAcc);

      return {
        currentAcc: {
          ...prev.currentAcc,
          movements: prev.currentAcc.movements.concat(-amount),
        },
        // currentAcc: this.state.accounts.find((acc) => acc.username === fromAcc),
        // movements: this.state.currentAcc.movements.concat(-amount),
        accounts: this.state.accounts.map((acc) => {
          if (acc.username === fromAcc) {
            return { ...acc, movements: acc.movements.concat(-amount) };
          }
          if (acc.username === forAcc) {
            return { ...acc, movements: acc.movements.concat(amount) };
          }
          return acc;
        }),
      };
    });
  }

  render() {
    return (
      <div className="App">
        <TopNav currentAcc={this.state.currentAcc} login={this.handleLogin} />
        <Account
          currentAcc={this.state.currentAcc}
          lend={this.handleLend}
          calcValue={calcValue}
        />
      </div>
    );
  }
}

export default App;
