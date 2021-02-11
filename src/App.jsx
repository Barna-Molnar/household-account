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
      isAnimationEnded: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleRepayment = this.handleRepayment.bind(this);
    this.handleUploadMoney = this.handleUploadMoney.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.handleCloseOverlay = this.handleCloseOverlay.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.setState({
      loginVisibility: true,
      currentAcc: undefined,
      // isAnimationEnded: false,
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
  handleRepayment(fromAcc, forAcc, amount, message = "") {
    this.setState((prev) => {
      return {
        currentAcc: {
          ...prev.currentAcc,
          movements: [
            {
              amount: -amount,
              date: date,
              transactionTyp: "repayment",
              sender: fromAcc,
              recepient: forAcc,
              message: message,
            },
            ...prev.currentAcc.movements,
          ],
          balance: prev.currentAcc.balance - amount,
          debt: prev.currentAcc.debt.map((item, i) => {
            if (item.to === forAcc) {
              if (item.value - amount === 0) {
                return prev.currentAcc.debt.splice(1, i);
              } else {
                return { value: item.value - amount, to: forAcc };
              }
            } else {
              return item;
            }
          }),
        },
        accounts: this.state.accounts.map((acc) => {
          if (acc.username === fromAcc) {
            return {
              ...acc,
              movements: [
                {
                  amount: -amount,
                  date: date,
                  transactionTyp: "repayment",
                  sender: fromAcc,
                  recepient: forAcc,
                  message: message,
                },
                ...acc.movements,
              ],
              balance: acc.balance - amount,
              debt: prev.currentAcc.debt.map((item, i) => {
                if (item.to === forAcc) {
                  if (item.value - amount === 0) {
                    return prev.currentAcc.debt.splice(1, i);
                  } else {
                    return { value: item.value - amount, to: forAcc };
                  }
                } else {
                  return item;
                }
              }),
            };
          }
          if (acc.username === forAcc) {
            return {
              ...acc,
              movements: [
                {
                  amount: Number(amount),
                  date: date,
                  transactionTyp: "repayment",
                  sender: fromAcc,
                  recepient: forAcc,
                  message: message,
                },
                ...acc.movements,
              ],
              balance: acc.balance + Number(amount),
              owed: acc.owed.map((item, i) => {
                if (item.forWho === fromAcc) {
                  if (item.value - amount === 0) {
                    return acc.owed.splice(1, i);
                  } else {
                    return { value: item.value - amount, forWho: fromAcc };
                  }
                } else {
                  return item;
                }
              }),
            };
          }
          return acc;
        }),
      };
    });
  }

  handleLend(fromAcc, forAcc, amount, message = "dunno") {
    fromAcc = fromAcc.trim();
    forAcc = forAcc.trim();
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
        //////////owed array contain the acc who you are lending to ////////////////////
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
              // owed is an array about lended money
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
                  // owed is an array of lended money
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
                  // ddebt is an array about the money that the given account got
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

        /////////owed array doesn't contain the acc who you are lending to //////////////////
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
            // owed: prev.currentAcc.debt.map((item) => {
            //   if (item.to === forAcc && item.value < amount) {
            //     return "";
            //   } else {
            //     return [
            //       { value: amount, forWho: forAcc },
            //       ...prev.currentAcc.owed,
            //     ];
            //   }
            // }),
            // owed: [{ value: amount, forWho: forAcc }, ...prev.currentAcc.owed],
            // ha olyannak adsz kolcson aki neked tartozik=> ne keruljon bele owed-ba

            debt: prev.currentAcc.debt.map((item) => {
              if (item.to === forAcc) {
                return { value: item.value - amount, to: forAcc };
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
                  onExited={() => this.setState({ isAnimationEnded: true })}
                  onEntered={() => this.setState({ isAnimationEnded: false })}
                >
                  <Switch location={location}>
                    <Route path="/login">
                      <Login
                        isAnimationEnded={this.state.isAnimationEnded}
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
                        handleRepayment={this.handleRepayment}
                        lend={this.handleLend}
                        uploadMoney={this.handleUploadMoney}
                        logOut={this.handleLogOut}
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
