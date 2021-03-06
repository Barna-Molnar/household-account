import React, { Component } from 'react';
import './Status.scss';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
  }
  onChange = (date) => this.setState({ date });
  render() {
    return (
      <div className="status">
        <div className="status__current-container">
          <p className="status__name">{this.props.currentAcc.owner}</p>

          <p className="status__accNum">
            {this.props.currentAcc.accNum}{' '}
            <span className="status__accNum--arr">&rarr;</span>
          </p>
          <p className="status__date">{this.props.date}</p>
          <p className="status__label">Available funds</p>
          <p className="status__value">
            {this.props.currentAcc?.balance
              ? this.props.currentAcc?.balance
              : 0}
            <span className="status__value--euro">€</span>
          </p>
        </div>
        <div className="status__message">
          <div className="status__message--label">
            <p>Transactions list</p>
          </div>

          <div className="cards">
            {this.props.currentAcc?.lended.map((lended, i) => {
              if (lended.length === 0) {
                return '';
              } else {
                return (
                  <div className="card lended" key={i}>
                    <h3>{lended.to}</h3>
                    <p>owes you</p>
                    <p>{lended.value}€</p>
                  </div>
                );
              }
            })}
            {this.props.currentAcc?.debt.map((debt, i) => {
              if (debt.length === 0) {
                return '';
              } else {
                return (
                  <div className="card borrowed" key={i}>
                    <h3> I owe</h3>
                    <p>{debt.value}€</p>to
                    <h3>{debt.to}</h3>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
