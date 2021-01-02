import React from "react";
import "./Account.scss";
import "./Account.scss";
import "./data";
import Movements from "./Movements";
import NewOperator from "./NewOperator";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAcc: this.props.currentAcc, /// <= this is not working
      currentValue: "",
      recepient: "",
      accToBlock: "",
      lendAmount: "",
      message: "",
    };
    this.blockBtnText = this.blockBtnText.bind(this);
  }
  blockBtnText() {
    const acc = this.props.accounts.find((acc) => {
      return acc.username === this.state.accToBlock;
    });
    if (acc === undefined || acc.isBlocked === false) {
      return "block";
    } else {
      return "unblock";
    }
  }
  render() {
    return (
      <div
        className="main"
        style={
          this.props.currentAcc === undefined ? { opacity: 0 } : { opacity: 1 }
        }
      >
        {/* status component */}
        <div className="status">
          <div>
            <p className="status__label">Current Status</p>
            <p className="status__date">Actuel Date with js...later</p>
          </div>
          <div>
            <p
              className="status__message"
              style={
                this.props.currentAcc === undefined
                  ? { opacity: 0 }
                  : this.props.currentAcc.isBlocked === true
                  ? { opacity: 100 }
                  : { opacity: 0 }
              }
            >
              {this.props.currentAcc?.message}
            </p>
          </div>
          <div>
            <p className="status__value">
              {this.props.currentAcc?.balance
                ? this.props.currentAcc?.balance
                : 0}
              {/* {this.props.currentAcc?.movements.reduce(
                (acc, currVale) => acc + currVale,
                0
              )} */}
              €
            </p>
          </div>
        </div>
        {/* account component */}
        <div className="accBody">
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
                  />

                  <input
                    value={this.state.lendAmount}
                    onChange={(e) => {
                      this.setState({ lendAmount: Number(e.target.value) });
                    }}
                    type="number"
                    className="form__input form__input--amount"
                  />
                  <button
                    className="form__btn form__btn--lend"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.lend(
                        this.props.currentAcc.username,
                        this.state.recepient,
                        this.state.lendAmount,
                        this.state.message
                      );
                      this.setState({
                        recepient: "",
                        lendAmount: "",
                        message: "",
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
                  value={this.state.message}
                  onChange={(e) => {
                    this.setState({ message: e.target.value });
                  }}
                  type="text"
                  className="form__input form__input--message"
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
            <div className="op op--borrow">
              <h2>Borrow money</h2>
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
                    type="text"
                    className="form__input form__input--fromWho"
                  />

                  <input
                    type="number"
                    className="form__input form__input--amount"
                  />
                  <button className="form__btn form__btn--borrow">
                    &rarr;
                  </button>
                </div>
                <div className="label-flex">
                  <div>
                    <label htmlFor="#" className="form__label">
                      From Who
                    </label>
                  </div>
                  <div>
                    <label htmlFor="#" className="form__label">
                      Amount
                    </label>
                  </div>
                </div>
              </form>
            </div>
            {this.props.currentAcc !== undefined &&
            (this.props.currentAcc.username === "jm" ||
              this.props.currentAcc.username === "tm") ? (
              <div className="op op--block">
                <h2>Block account</h2>
                <form action="#" className="form form--block">
                  <div className="input-flex">
                    <input
                      value={this.state.accToBlock}
                      onChange={(e) => {
                        this.setState({ accToBlock: e.target.value });
                        this.blockBtnText();
                      }}
                      type="text"
                      className="form__input form__input--Whoose"
                    />

                    <input
                      value={this.state.message}
                      onChange={(e) => {
                        this.setState({ message: e.target.value });
                      }}
                      type="text"
                      className="form__input form__input--Why"
                    />
                    <button
                      className="form__btn form__btn--block"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.handleBlock(
                          this.props.currentAcc.username,
                          this.state.accToBlock,
                          this.state.message
                        );
                        this.setState({
                          accToBlock: "",
                          message: "",
                        });
                      }}
                    >
                      {this.blockBtnText()}
                    </button>
                  </div>
                  <div className="label-flex">
                    <div>
                      <label htmlFor="#" className="form__label">
                        Whoose Acc
                      </label>
                    </div>
                    <div>
                      <label htmlFor="#" className="form__label">
                        Why
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mov">
            {/* {this.props.currentAcc?.movements.map((mov, i) => {
              return (
                <Movements
                  key={i + 1}
                  i={i}
                  type={mov > 0 ? "dep" : "withD"}
                  mov={mov}
                  date={this.props.currentAcc?.date}
                />
              );
            })} */}
            {/* //////////////// */}
            {/*to test*/}
            {this.props.currentAcc?.movements.map((mov, i) => {
              return (
                <Movements
                  recepient={mov.recepient}
                  transactionTyp={mov.transactionTyp}
                  key={i + 1}
                  i={i}
                  type={mov.amount > 0 ? "dep" : "withD"}
                  mov={mov.amount}
                  message={mov.message}
                  date={mov.date}
                />
              );
            })}
          </div>
        </div>
        <div className="summeries">
          <p className="summeries__label">in</p>
          <p className="summeries__value summeries__value--in">
            {this.props.currentAcc?.movements
              .filter((mov) => mov > 0)
              .reduce((acc, curr) => acc + curr, 0)}
            €
          </p>
          <p className="summeries__label">out</p>
          <p className="summeries__value summeries__value--out">
            {this.props.currentAcc?.movements
              .filter((mov) => mov < 0)
              .reduce((acc, curr) => acc + curr, 0)}
            €
          </p>
        </div>

        <NewOperator />
      </div>
    );
  }
}

export default Account;
