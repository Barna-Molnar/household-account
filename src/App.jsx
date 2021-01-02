import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import React from "react";
import { accounts, testAccArr, date } from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
      accounts: accounts,
      testAcc: testAccArr,
      actuelDate: date,
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
              return { ...acc, message: message, isBlocked: !acc.isBlocked };
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
  handleLend(fromAcc, forAcc, amount, message = "dunno") {
    const today = new Date();
    let date = today.getMonth() + 1 + "-" + today.getDate();
    this.setState((prev) => {
      return {
        currentAcc: {
          ...prev.currentAcc,
          movements: [
            {
              amount: -amount,
              date: date,
              transactionTyp: "lend",
              sender: fromAcc,
              recepient: forAcc,
              message: message,
            },
            ...prev.currentAcc.movements,
          ],
          balance: prev.currentAcc.balance - amount,
        },
        accounts: this.state.accounts.map((acc) => {
          if (acc.username === fromAcc) {
            return {
              ...acc,
              movements: [
                {
                  amount: -amount,
                  date: date,
                  transactionTyp: "lend",
                  sender: fromAcc,
                  recepient: forAcc,
                  message: message,
                },
                ...acc.movements,
              ],
              balance: acc.balance - amount,
            };
          }
          if (acc.username === forAcc) {
            return {
              ...acc,
              movements: [
                {
                  amount: amount,
                  date: date,
                  transactionTyp: "borrow",
                  sender: fromAcc,
                  recepient: forAcc,
                  message: message,
                },
                ...acc.movements,
              ],
              balance: acc.balance + amount,
            };
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
        />
      </div>
    );
  }
}

export default App;
