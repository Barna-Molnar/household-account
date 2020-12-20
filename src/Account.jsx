import React from "react";
import "./Account.scss";
import "./data.js";
import Movements from "./Movements.jsx";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "",
    };
  }

  render() {
    return (
      <div
        className="main"
        style={
          this.props.currentAcc !== undefined ? { opacity: 1 } : { opacity: 0 }
        }
      >
        {/* status component */}
        <div className="status">
          <div>
            <p className="status__label">Current Status</p>
            <p className="status__date">Actuel Date with js...later</p>
          </div>
          <div>
            <p className="status__value">
              {this.props.currentAcc?.value}
              {/* {this.props.currentAcc !== undefined
                ? this.props.currentAcc.value
                : 0} */}
              €
            </p>
          </div>
        </div>
        {/* account component */}
        <div className="accBody">
          <div className="ops">
            <div className="op op--lend">
              <h2>Lend money</h2>
              <form action="#" className="form form--lend">
                <div className="input-flex">
                  <input
                    type="text"
                    className="form__input form__input--forWho"
                  />

                  <input
                    type="number"
                    className="form__input form__input--amount"
                  />
                  <button className="form__btn form__btn--lend">&rarr;</button>
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
              </form>
            </div>
            <div className="op op--borrow">
              <h2>Borrow money</h2>
              <form action="#" className="form form--borrow">
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
            <div className="op op--block">
              <h2>Block account</h2>
              <form action="#" className="form form--block">
                <div className="input-flex">
                  <input type="text" className="form__input form__input--Who" />

                  <input type="text" className="form__input form__input--Why" />
                  <button className="form__btn form__btn--block">&rarr;</button>
                </div>
                <div className="label-flex">
                  <div>
                    <label htmlFor="#" className="form__label">
                      Who
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
          </div>
          <div className="mov">
            {this.props.currentAcc?.movements.map((mov, i) => {
              return (
                <Movements i={i} type={mov > 0 ? "dep" : "withD"} mov={mov} />
              );
            })}

            {/* <div className="mov__row">
              <div className="mov__type mov__type--dep">2 dep</div>
              <div className="mov__date">2 days ago</div>
              <div className="mov__message">For School</div>
              <div className="mov__value">500$</div>
            </div>
            <div className="mov__row">
              <div className="mov__type mov__type--withD">1 withdraw</div>
              <div className="mov__date">2 days ago</div>
              <div className="mov__message">For School</div>
              <div className="mov__value">500$</div>
            </div> */}
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
      </div>
    );
  }
}

export default Account;
