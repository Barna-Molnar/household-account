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
import { updateCurrAcc, updateData, addMovement } from "./updateFunctions.js";
import { updateAccsRepay } from "./updateAccsRepay.js";
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
    this.validationForTransaction = this.validationForTransaction.bind(this);
  }
  validationForTransaction(state, fromAcc, forAcc, amount, currentAcc) {
    // - WhiteSpace
    fromAcc = fromAcc.trim();
    forAcc = forAcc.trim();
    // creating "valid" variable to validationForTransaction
    const valid = state.accounts.find((acc) => acc.username === forAcc);
    if (!forAcc && !amount) {
      this.setState({
        overlayHidden: false,
        overlayText: "Missed dates",
      });
      return false;
    } else if (amount > state.currentAcc.balance) {
      this.setState({
        overlayHidden: false,
        overlayText: "You don't have enough money!",
      });
      return false;
    } else if (fromAcc === forAcc) {
      this.setState({
        overlayHidden: false,
        overlayText: "You can't sent money for Yourself!",
      });
      return false;
    } else if (!valid) {
      this.setState({
        overlayHidden: false,
        overlayText: "Invalid userName",
      });
      return false;
    } else if (amount <= 0) {
      this.setState({
        overlayHidden: false,
        overlayText: "Invalid value",
      });
      return false;
    }
    return true;
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
    const isValid = this.validationForTransaction(
      this.state,
      fromAcc,
      forAcc,
      amount
    );
    if (isValid)
      this.setState((prev) => {
        return {
          currentAcc: updateCurrAcc(
            forAcc,
            "repayment",
            amount,
            message,
            prev,
            date
          ),
          accounts: updateAccsRepay(
            fromAcc,
            forAcc,
            "repayment",
            amount,
            message,
            this.state,
            prev,
            date
          ),
        };
      });
  }

  handleLend(fromAcc, forAcc, amount, message = "dunno") {
    // validationForTransaction
    const isValid = this.validationForTransaction(
      this.state,
      fromAcc,
      forAcc,
      amount
    );
    if (isValid) {
      this.setState((prev) => {
        //////////lended array contain the acc who you are lending to /////////////
        if (prev.currentAcc.lended.some((item) => item.to === forAcc)) {
          return {
            currentAcc: updateCurrAcc(
              forAcc,
              "lend",
              amount,
              message,
              prev,
              date
            ),
            accounts: this.state.accounts.map((acc) => {
              if (acc.username === fromAcc) {
                return {
                  ...acc,
                  movements: addMovement(
                    fromAcc,
                    forAcc,
                    -amount,
                    "lend",
                    message,
                    date,
                    acc
                  ),
                  balance: acc.balance - amount,
                  // lended is an array of lended money
                  lended: updateData(acc.lended, forAcc, -amount),
                };
              }
              if (acc.username === forAcc) {
                return {
                  ...acc,
                  movements: addMovement(
                    fromAcc,
                    forAcc,
                    amount,
                    "borrow",
                    message,
                    date,
                    acc
                  ),
                  balance: acc.balance + amount,
                  // debt is an array about the money that the given account got
                  debt: updateData(acc.debt, fromAcc, amount),
                };
              }
              return acc;
            }),
          };
        }
        /////////lended array doesn't contain the acc who you are lending to ///////
        return {
          currentAcc: {
            ...prev.currentAcc,
            movements: addMovement(
              fromAcc,
              forAcc,
              -amount,
              "lend",
              message,
              date,
              prev.currentAcc
            ),
            balance: prev.currentAcc.balance - amount,
            lended: [{ value: amount, to: forAcc }, ...prev.currentAcc.lended],
            debt: updateData(prev.currentAcc.debt, forAcc, -amount),
          },
          accounts: this.state.accounts.map((acc) => {
            if (acc.username === fromAcc) {
              return {
                ...acc,
                movements: addMovement(
                  fromAcc,
                  forAcc,
                  -amount,
                  "lend",
                  message,
                  date,
                  acc
                ),
                balance: acc.balance - amount,
                lended: [{ value: amount, to: forAcc }, ...acc.lended],
              };
            }
            if (acc.username === forAcc) {
              return {
                ...acc,
                movements: addMovement(
                  fromAcc,
                  forAcc,
                  amount,
                  "borrow",
                  message,
                  date,
                  acc
                ),
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
