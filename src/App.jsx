import './App.scss';
import TopNav from './TopNav.jsx';
import Account from './Account.jsx';
import Overlay from './Overlay.jsx';
import Login from './Login.jsx';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { accounts, date } from './data.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { updateAccsLend } from './updateFunctions/updateAccsLend';
import { updateCurrAcc } from './updateFunctions/updateCurrAcc';
import { updateAccsRepay } from './updateFunctions/updateAccsRepay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: undefined,
      accounts: accounts,
      actuelDate: date,
      overlayHidden: true,
      overlayText: '',
      loginVisibility: true,
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

  validationForTransaction(state, fromAcc, forAcc, amount, transactionTyp) {
    // - WhiteSpace
    fromAcc = fromAcc.trim();
    forAcc = forAcc.trim();

    // creating "valid" variable to validationForTransaction checking acc
    const valid = state.accounts.find((acc) => acc.username === forAcc);
    //checking whether there is a debt or not
    const doIHaveDebt = state.currentAcc.debt.find(
      (item) => item.to === forAcc
    );
    /// creating obj variable to update the state if the certain conditions meet
    const obj = { overlayHidden: false, overlayText: '' };
    if (!valid) {
      obj.overlayText = 'Invalid userName';
    } else if (fromAcc === forAcc) {
      obj.overlayText = "You can't send money for Yourself!";
    } else if (doIHaveDebt === undefined && transactionTyp !== 'lend') {
      obj.overlayText = `You don't have any debt for ${forAcc.toUpperCase()}`;
    } else if (doIHaveDebt?.value - amount < 0) {
      obj.overlayText = `You have to check first your debts`;
    } else if (!forAcc && !amount) {
      obj.overlayText = 'Missed dates';
    } else if (amount > state.currentAcc.balance) {
      obj.overlayText = "You don't have enough money!";
    } else if (amount <= 0) {
      obj.overlayText = 'Invalid value';
    }

    if (obj.overlayText !== '') {
      this.setState(obj);
      return false;
    } else {
      return true;
    }
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

  handleUploadMoney(forAcc, amount, message = 'upload') {
    console.log(forAcc, amount);
    if (amount <= 0) {
      this.setState({
        overlayHidden: false,
        overlayText: 'invalid value',
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
                transactionTyp: 'upload',
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
                    transactionTyp: 'upload',
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
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  handleRepayment(fromAcc, forAcc, amount, message = 'repayment') {
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
            'repayment',
            amount,
            message,
            prev,
            date
          ),
          accounts: updateAccsRepay(
            fromAcc,
            forAcc,
            'repayment',
            amount,
            message,
            this.state,
            prev,
            date
          ),
        };
      });
  }

  handleLend(fromAcc, forAcc, amount, message = 'dunno') {
    // validationForTransaction
    const isValid = this.validationForTransaction(
      this.state,
      fromAcc,
      forAcc,
      amount,
      'lend'
    );
    if (isValid) {
      this.setState((prev) => {
        //////////lended array contain the acc who you are lending to /////////////
        const isAccExistsInLended = prev.currentAcc.lended.some(
          (item) => item.to === forAcc
        ); /// lepassolni az indexet

        console.log(isAccExistsInLended);
        if (isAccExistsInLended) {
          return {
            currentAcc: updateCurrAcc(
              forAcc,
              'lend',
              -amount,
              message,
              prev,
              date,
              isAccExistsInLended
            ),
            accounts: updateAccsLend(
              this.state.accounts,
              fromAcc,
              forAcc,
              amount,
              message,
              date,
              isAccExistsInLended
            ),
          };
        }
        /////////lended array doesn't contain the acc who you are lending to ///////
        return {
          currentAcc: updateCurrAcc(
            forAcc,
            'lend',
            -amount,
            message,
            prev,
            date,
            isAccExistsInLended
          ),
          accounts: updateAccsLend(
            this.state.accounts,
            fromAcc,
            forAcc,
            amount,
            message,
            date,
            isAccExistsInLended
          ),
        };
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="app-container">
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
                        {this.state.currentAcc ? <Redirect to="/" /> : ''}
                      </Route>
                      {this.state.currentAcc ? '' : <Redirect to="/login" />}
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
        </div>
      </Router>
    );
  }
}

export default App;
