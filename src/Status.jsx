import React, { Component } from "react";
import "./Status.scss";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }
  render() {
    return (
      <div className="status">
        <div>
          <p className="status__label">Current Status</p>
          <p className="status__date">{this.props.date}</p>
        </div>
        <div className={`status__message ${this.state.hidden ? "hidden" : ""}`}>
          {console.log(this.state.currentAcc)}
          {this.props.currentAcc?.debt.map((debt, i) => {
            console.log(debt.length);
            if (debt.length === 0) {
              return "";
            } else {
              return (
                <p key={i}>
                  I owe {debt.value} to {debt.to}
                </p>
              );
            }
          })}
          {this.props.currentAcc?.owed.map((owed, i) => {
            if (owed.length === 0) {
              return "";
            } else {
              return (
                <p key={i}>
                  {owed.forWho} owes you {owed.value}
                </p>
              );
            }
          })}
        </div>
        <div>
          <p className="status__value">
            {this.props.currentAcc?.balance
              ? this.props.currentAcc?.balance
              : 0}
            €
          </p>
        </div>
      </div>
    );
  }
}

export default Status;
