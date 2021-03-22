import React, { Component } from 'react';
import Calendar from 'react-calendar';

import './Status.scss';

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      date: new Date(),
    };
  }
  onChange = (date) => this.setState({ date });
  render() {
    return (
      <div className="status">
        <div className="status__current-container">
          <p className="status__label">{this.props.currentAcc.owner}</p>

          <p className="status__accNum">
            {this.props.currentAcc.accNum}{' '}
            <span className="status__accNum--arr">&rarr;</span>
          </p>
          <p className="status__date">{this.props.date}</p>
          <p className="status__label--value">Available funds</p>
          <p className="status__value">
            {this.props.currentAcc?.balance
              ? this.props.currentAcc?.balance
              : 0}
            <span className="status__value--euro">€</span>
          </p>
        </div>
        <div
          className={`status__message 
          ${this.props.currentAcc?.debt.length === 0 ? '0' : ''} 
          
          `} /// develop fase string 0 === "hidden"
        >
          {this.props.currentAcc?.debt.map((debt, i) => {
            if (debt.length === 0) {
              return '';
            } else {
              return (
                <p key={i}>
                  I owe {debt.value} to {debt.to}
                </p>
              );
            }
          })}
          {this.props.currentAcc?.lended.map((lended, i) => {
            if (lended.length === 0) {
              return '';
            } else {
              return (
                <p key={i}>
                  {lended.to} owes you {lended.value}
                </p>
              );
            }
          })}
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            activeStartDate={new Date()}
            defaultView={'year'}
          />
        </div>
        {/* <div>
          <p className="status__value">
            {this.props.currentAcc?.balance
              ? this.props.currentAcc?.balance
              : 0}
            €
          </p>
        </div> */}
      </div>
    );
  }
}

export default Status;
