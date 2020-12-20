import React, { Component } from "react";

class Movements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="mov__row">
        <div className={`mov__type mov__type--${this.props.type}`}>
          {this.props.key + 1} {this.props.type}
        </div>
        <div className="mov__date">2 days ago</div>
        <div className="mov__message">For School</div>
        <div className="mov__value">{this.props.mov}€</div>
      </div>
    );
  }
}

export default Movements;

// {
//   this.props.currentAcc !== undefined
//     ? this.props.currentAcc.movements.map((mov, i) => {
//         const type = mov > 0 ? "dep" : "withD";
//         return `
//       <div className="mov__row">
//       <div className="mov__type mov__type--${type}">
//       ${i + 1} ${type}</div>
//       <div className="mov__date">2 days ago</div>
//       <div className="mov__message">For School</div>
//       <div className="mov__value">${mov}</div>
//     </div>

//       `;
//       })
//     : "";
// }
