import React from "react";
import "./Overlay.scss";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          className={`overlay ${this.props.hidden === true ? "hidden" : ""}`}
        >
          &nbsp;
        </div>
        <div
          className={`overlay-text ${
            this.props.hidden === true ? "hidden" : ""
          }`}
        >
          <p>{this.props.overlayText}</p>
          <button
            className="overlay-btn"
            onClick={this.props.handleCloseOverlay}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default Overlay;
