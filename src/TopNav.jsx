import React from 'react';
import { MdPowerSettingsNew } from 'react-icons/md';
import './TopNav.scss';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pin: '',
    };
  }
  render() {
    return (
      <nav>
        <p className="welcome">
          {this.props.currentAcc === undefined
            ? 'Welcome in our HouseHold Account'
            : `Welcome back ${this.props.currentAcc.owner.split(' ')[0]}`}
        </p>
        <img src="img/logo.png" alt="" className="logo" />
        <button
          style={{ display: this.props.logOutBtnVisibility ? 'none' : '' }}
          className="loginForm__btn"
          onClick={(e) => {
            e.preventDefault();
            this.props.logOut();
          }}
        >
          <span>
            <MdPowerSettingsNew />
          </span>{' '}
        </button>
      </nav>
    );
  }
}

export default TopNav;
