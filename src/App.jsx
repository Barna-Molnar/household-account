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
    this.handleBlock = this.handleBlock.bind(this);
  }
  handleBlock(fromAcc, forAcc, message = "") {
    if (fromAcc === "jm" || fromAcc === "tm") {
      this.setState((prev) => {
        return {
          currentAcc: prev.currentAcc,
          accounts: this.state.accounts.map((acc) => {
            if (acc.username === forAcc) {
              return { ...acc, message: message, isBlocked: true };
            }
            return acc;
          }),
        };
      });
    }
    console.log("you are not allowed use this functionality");
  }
  handleLogin(username, pin) {
    this.setState({
      currentAcc: this.state.accounts.find((acc) => acc.username === username),
    });
  }
  handleLend(fromAcc, forAcc, amount) {
    this.setState((prev) => {
      return {
        currentAcc: {
          ...prev.currentAcc,
          movements: prev.currentAcc.movements.concat(-amount),
        },

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
          accounts={this.state.accounts}
          currentAcc={this.state.currentAcc}
          handleBlock={this.handleBlock}
          lend={this.handleLend}
          calcValue={calcValue}
        />
      </div>
    );
  }
}

export default App;
