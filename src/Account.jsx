import React from 'react';
import './Account.scss';
import './variables.scss';
import './data';
import { format } from 'date-fns';
import Movements from './Movements';
import Status from './Status';

let timer;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: this.props.currentAcc === undefined ? false : true, /// <= this is not working
      currentValue: '',
      recepient: '',
      lendAmount: '',
      message: '',
      amount: '',
      repayAmount: '',
      repayMessage: '',
      repayRecepient: '',
      logOutTime: 3000, // it is related to to logoutTimer()
    };
    this.blockBtnText = this.blockBtnText.bind(this);
    this.logoutTimer = this.logoutTimer.bind(this);
  }

  blockBtnText() {
    const acc = this.props.accounts.find((acc) => {
      return acc.username === this.state.accToBlock;
    });
    if (acc === undefined || acc.isBlocked === false) {
      return 'block';
    } else {
      return 'unblock';
    }
  }
  logoutTimer() {
    if (this.state.logOutTime === 0) {
      clearInterval(timer);
      this.props.logOut();
    }

    // maybe we should do it from prevState?
    this.setState({
      logOutTime: this.state.logOutTime - 1,
    });
  }
  componentDidMount() {
    timer = setInterval(this.logoutTimer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.logoutTimer);
  }

  render() {
    let date = format(new Date(), 'dd/MM/yy');
    const min = String(Math.trunc(this.state.logOutTime / 60)).padStart(2, 0);
    const sec = String(this.state.logOutTime % 60).padStart(2, 0);
    return (
      <div className="main">
        <Status
          currentAcc={this.props.currentAcc}
          date={date}
          accounts={this.props.accounts}
        />

        {/* account component */}
        <div className="accBody">
          <div className="mov">
            <div className="mov__headline">
              <p className="mov__headline--text">Latest transactions</p>
              <button className="mov__headline--btn">
                {' '}
                <span> &rarr;</span>{' '}
              </button>
            </div>
            {this.props.currentAcc?.movements.map((mov, i) => {
              return (
                <Movements
                  recepient={mov.recepient}
                  sender={mov.sender}
                  transactionTyp={mov.transactionTyp}
                  key={i + 1}
                  i={i}
                  type={mov.amount > 0 ? 'dep' : 'withD'}
                  mov={mov.amount}
                  message={mov.message}
                  date={mov.date}
                />
              );
            })}
          </div>

          <div className="ops">
            <div className="op op--lend">
              <h2>Lend money</h2>
              <form
                action="#"
                className="form form--lend"
                style={
                  this.props.currentAcc === undefined
                    ? { opacity: 0 }
                    : this.props.currentAcc.isBlocked === true
                    ? { opacity: 0 }
                    : { opacity: 1 }
                }
              >
                <div className="input-flex">
                  <input
                    value={this.state.recepient}
                    onChange={(e) => {
                      this.setState({ recepient: e.target.value });
                    }}
                    type="text"
                    className="form__input form__input--forWho"
                    placeholder="Acc"
                  />

                  <input
                    value={this.state.lendAmount}
                    onChange={(e) => {
                      this.setState({ lendAmount: Number(e.target.value) });
                    }}
                    type="number"
                    className="form__input form__input--amount"
                    min="1"
                    placeholder="Amount"
                  />
                  <button
                    className="form__btn form__btn--lend"
                    onClick={(e) => {
                      e.preventDefault();
                      if (this.state.message === '') {
                        this.props.lend(
                          this.props.currentAcc.username,
                          this.state.recepient,
                          this.state.lendAmount
                        );
                      } else {
                        this.props.lend(
                          this.props.currentAcc.username,
                          this.state.recepient,
                          this.state.lendAmount,
                          this.state.message
                        );
                      }
                      this.setState({
                        recepient: '',
                        lendAmount: '',
                        message: '',
                      });
                    }}
                  >
                    &rarr;
                  </button>
                </div>
                <div className="label-flex">
                  <div>
                    <label htmlFor="#" className="form__label">
                      For Who
                    </label>
                  </div>
                  <div>
                    <label htmlFor="#" className="form__label">
                      Amount
                    </label>
                  </div>
                </div>
                <input
                  className="form__input form__input--message"
                  maxLength="25"
                  value={this.state.message}
                  onChange={(e) => {
                    this.setState({ message: e.target.value });
                  }}
                  type="text"
                  placeholder="Explanation"
                />
                <div>
                  <div className="label-flex">
                    <label htmlFor="#" className="form__label explanation">
                      Explanation
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="op op--repayment">
              <h2>Repay Debt</h2>
              <form action="#" className="form form--repayment">
                <div className="input-flex">
                  <input
                    value={this.state.repayRecepient}
                    onChange={(e) => {
                      this.setState({ repayRecepient: e.target.value });
                    }}
                    type="text"
                    className="form__input form__input--for"
                    placeholder="Acc"
                  />

                  <input
                    value={this.state.repayAmount}
                    onChange={(e) => {
                      this.setState({ repayAmount: e.target.value });
                    }}
                    type="number"
                    className="form__input form__input--amount"
                    min="1"
                    placeholder="Amount"
                  />
                  <button
                    className="form__btn form__btn--repayment"
                    onClick={(e) => {
                      e.preventDefault();
                      if (this.state.repayMessage === '') {
                        this.props.handleRepayment(
                          this.props.currentAcc.username,
                          this.state.repayRecepient,
                          this.state.repayAmount
                        );
                      } else {
                        this.props.handleRepayment(
                          this.props.currentAcc.username,
                          this.state.repayRecepient,
                          this.state.repayAmount,
                          this.state.repayMessage
                        );
                      }
                      this.setState({
                        repayRecepient: '',
                        repayAmount: '',
                        repayMessage: '',
                      });
                    }}
                  >
                    &rarr;
                  </button>
                </div>
                <div className="label-flex">
                  <div>
                    <label htmlFor="#" className="form__label">
                      For Who
                    </label>
                  </div>
                  <div>
                    <label htmlFor="#" className="form__label">
                      Amount
                    </label>
                  </div>
                </div>
                <input
                  className="form__input form__input--message"
                  maxLength="25"
                  value={this.state.repayMessage}
                  onChange={(e) => {
                    this.setState({ repayMessage: e.target.value });
                  }}
                  type="text"
                  placeholder="Explanation"
                />
                <div>
                  <div className="label-flex">
                    <label htmlFor="#" className="form__label">
                      Explanation
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="op op--upload">
              <h2>Upload money</h2>
              <form
                action="#"
                className="form form--borrow"
                style={
                  this.props.currentAcc === undefined
                    ? { opacity: 0 }
                    : this.props.currentAcc.isBlocked === true
                    ? { opacity: 0 }
                    : { opacity: 1 }
                }
              >
                <div className="input-flex">
                  <input
                    value={this.state.amount}
                    onChange={(e) => {
                      this.setState({ amount: Number(e.target.value) });
                    }}
                    type="number"
                    className="form__input"
                    min="1"
                    placeholder="Amount"
                  />
                  <button
                    className="form__btn form__btn--borrow"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.uploadMoney(
                        this.props.currentAcc.username,
                        this.state.amount
                      );
                      this.setState({
                        recepient: '',
                        amount: '',
                      });
                    }}
                  >
                    &rarr;
                  </button>
                </div>
                <div className="label-flex">
                  <div>
                    <label htmlFor="#" className="form__label">
                      Amount
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="summeries">
            <div className="summeries__header">
              <p className="summeries__header--text">Summeries</p>
              <p
                style={{
                  fontSize: '20px',
                  color: '#777',
                  marginRight: 'auto',
                  marginLeft: '.5rem',
                }}
              >
                (Daily)
              </p>
              <button className="mov__header--btn">
                {' '}
                <span> &rarr;</span>{' '}
              </button>
            </div>
            <div className="summeries__body">
              <div className="labels">
                <p className="summeries__label">income</p>
                <p className="summeries__label">outgang</p>
                <p className="summeries__label">Logged out in:</p>
              </div>
              <div className="values">
                <p className="summeries__value summeries__value--in">
                  {this.props.currentAcc?.movements
                    .map((mov) => {
                      return mov.amount > 0 ? mov.amount : 0;
                    })
                    .reduce((acc, curr) => acc + curr, 0)}
                  €
                </p>
                <p className="summeries__value summeries__value--out">
                  {this.props.currentAcc?.movements
                    .map((mov) => {
                      return mov.amount < 0 ? mov.amount : 0;
                    })
                    .reduce((acc, curr) => acc + curr, 0)}
                  €
                </p>
                <p className="timer">
                  {min}:{sec}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
