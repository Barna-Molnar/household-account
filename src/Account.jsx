import React from "react";
import "./Account.scss";

const Account = () => {
  return (
    <div className="main">
      {/* status component */}
      <div className="status">
        <div>
          <p className="status__label">Current Status</p>
          <p className="status__date">Actuell Date with js...later</p>
        </div>
        <div>
          <p className="status__value">0€</p>
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
                <button className="form__btn form__btn--borrow">&rarr;</button>
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
        <div className="mov"></div>
      </div>
    </div>
  );
};

export default Account;
