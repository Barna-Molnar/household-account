import React, { Component } from "react";
import "./Movements.scss";

class Movements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={`mov__row mov__row--${this.props.type}`}>
        <div className={`mov__type mov__type--${this.props.type}`}>
          {this.props.i + 1} {this.props.type}
        </div>
        <div className="mov__transactionTyp">{this.props.transactionTyp}</div>
        <div className="mov__direction">
          {this.props.type === "dep"
            ? `from: ${this.props.sender}`
            : ` for ${this.props.recepient}`}
        </div>
        <div className="mov__date">
          {this.props.date ? this.props.date : "unknown"}
        </div>
        <div className="mov__message">{this.props.message}</div>
        <div className="mov__value">{this.props.mov}€</div>
      </div>
    );
  }
}

export default Movements;
