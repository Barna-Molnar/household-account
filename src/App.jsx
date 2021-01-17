import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import Overlay from "./Overlay.jsx";
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
      overlayHidden: true,
      overlayText: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
  }
  handleCloseOverlay() {
    this.setState({
      overlayHidden: true,
    });
  }
  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({
        overlayHidden: true,
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
      this.setState({
        overlayHidden: false,
        overlayText: "nincsenek adatok",
      });
    } else if (amount > this.state.currentAcc.balance) {
      this.setState({
        overlayHidden: false,
        overlayText: "nincsen eleg zseton",
      });
    } else if (fromAcc === forAcc) {
      this.setState({
        overlayHidden: false,
        overlayText: "magadnak nem tucc kuldeni",
      });
    } else if (!valid) {
      this.setState({
        overlayHidden: false,
        overlayText: "invalid acc",
      });
    } else if (amount <= 0) {
      this.setState({
        overlayHidden: false,
        overlayText: "invalid value",
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
            owed: [{ value: amount, forWho: forAcc }, ...prev.currentAcc.owed],
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
                owed: [{ value: amount, forWho: forAcc }, ...acc.owed],
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
                debt: [{ value: amount, to: fromAcc }, ...acc.debt],
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
        <Overlay
          overlayText={this.state.overlayText}
          hidden={this.state.overlayHidden}
          handleCloseOverlay={this.handleCloseOverlay}
        />
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
