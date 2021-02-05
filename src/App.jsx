import "./App.scss";
import TopNav from "./TopNav.jsx";
import Account from "./Account.jsx";
import Overlay from "./Overlay.jsx";
import Login from "./Login.jsx";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { accounts, date } from "./data.js";
import { compareAsc, format } from "date-fns";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
      accounts: accounts,
      actuelDate: date,
      overlayHidden: true,
      overlayText: "",
      loginVisibility: true,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUploadMoney = this.handleUploadMoney.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.setState({
      loginVisibility: true,
      currentAcc: undefined,
    });
  }
  handleLogin(username, pin) {
    const valid = this.state.accounts.find((acc) => acc.username === username);
    if (valid) {
      this.setState({
        currentAcc: this.state.accounts.find(
          (acc) => acc.username === username
        ),
        loginVisibility: false,
      });
    }
  }

  handleUploadMoney(forAcc, amount, message = "upload") {
    console.log(forAcc, amount);
    if (amount <= 0) {
      this.setState({
        overlayHidden: false,
        overlayText: "invalid value",
      });
    } else
      this.setState((prev) => {
        return {
          currentAcc: {
            ...prev.currentAcc,
            movements: [
              {
                amount: amount,
                date: date,
                transactionTyp: "upload",
                sender: forAcc,
                recepient: forAcc,
                message: message,
              },
              ...prev.currentAcc.movements,
            ],
            balance: prev.currentAcc.balance + amount,
          },
          accounts: this.state.accounts.map((acc) => {
            if (acc.username === forAcc) {
              return {
                ...acc,
                movements: [
                  {
                    amount: +amount,
                    date: date,
                    transactionTyp: "upload",
                    sender: forAcc,
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
        //////////debt is not an empty array////////////////////
        if (prev.currentAcc.owed.some((item) => item.forWho === forAcc)) {
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
              owed: prev.currentAcc.owed.map((item) => {
                if (item.forWho === forAcc) {
                  return { value: item.value + amount, forWho: forAcc };
                } else {
                  return item;
                }
              }),
              // [{ value: amount, forWho: forAcc }, ...prev.currentAcc.owed],
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
                  owed: acc.owed.map((item) => {
                    if (item.forWho === forAcc) {
                      return { value: item.value + amount, forWho: forAcc };
                    } else {
                      return item;
                    }
                  }),
                  // [{ value: amount, forWho: forAcc }, ...acc.owed],
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
                  debt: acc.debt.map((item) => {
                    if (item.to === fromAcc) {
                      return { value: item.value + amount, to: fromAcc };
                    } else {
                      return item;
                    }
                  }),
                  // [{ value: amount, to: fromAcc }, ...acc.debt],
                };
              }
              return acc;
            }),
          };
        }

        ///////// debt is an empty array //////////////////
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

            // [{ value: amount, forWho: forAcc }, ...prev.currentAcc.owed],
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
      <Router>
        <div className="App">
          <Overlay
            overlayText={this.state.overlayText}
            hidden={this.state.overlayHidden}
            handleCloseOverlay={this.handleCloseOverlay}
          />
          <TopNav
            currentAcc={this.state.currentAcc}
            login={this.handleLogin}
            logOutBtnVisibility={this.state.loginVisibility}
            logOut={this.handleLogOut}
          />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  classNames="login-transition"
                  timeout={1000}
                  key={location.key}
                >
                  <Switch location={location}>
                    <Route path="/login">
                      <Login
                        currentAcc={this.state.currentAcc}
                        login={this.handleLogin}
                        loginVisibility={this.state.loginVisibility}
                      />
                      {this.state.currentAcc ? <Redirect to="/" /> : ""}
                    </Route>
                    {this.state.currentAcc ? "" : <Redirect to="/login" />}
                    <Route path="/">
                      <Account
                        accounts={this.state.accounts}
                        currentAcc={this.state.currentAcc}
                        handleBlock={this.handleBlock}
                        lend={this.handleLend}
                        uploadMoney={this.handleUploadMoney}
                      />
                    </Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
