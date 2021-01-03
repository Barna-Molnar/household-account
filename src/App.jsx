import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import React from "react";
import { accounts, date } from "./data.js";
import { compareAsc, format } from "date-fns";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
      accounts: accounts,
      actuelDate: date,
      hidden: false,
      overlayText: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({
        hidden: false,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
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
    const valid = this.state.accounts.find((acc) => acc.username === forAcc);
    let date = format(new Date(), "dd/MM/yy");
    if (!forAcc && !amount) {
      console.log("nincsenek adatok");
      this.setState({
        hidden: true,
        overlayText: "nincsenek adatok",
      });
    } else if (amount > this.state.currentAcc.balance) {
      console.log("nincsen eleg zseton");
      this.setState({
        hidden: true,
        overlayText: "nincsen eleg zseton",
      });
    } else if (fromAcc === forAcc) {
      console.log("magadnak nem tucc kuldeni");
      this.setState({
        hidden: true,
        overlayText: "magadnak nem tucc kuldeni",
      });
    } else if (!valid) {
      console.log("invalid acc");
      this.setState({
        hidden: true,
        overlayText: "invalid acc",
      });
    } else {
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
  }

  render() {
    return (
      <div className="App">
        <div
          className={`overlay ${this.state.hidden === false ? "hidden" : ""}`}
        >
          &nbsp;
        </div>
        <div
          class={`overlay-text ${this.state.hidden === false ? "hidden" : ""}`}
        >
          <p>{this.state.overlayText}</p>
          <button
            className="overlay-btn"
            onClick={() => {
              this.setState({
                hidden: false,
              });
            }}
          >
            X
          </button>
        </div>
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
