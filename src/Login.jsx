import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      username: '',
      pin: '',
    };
  }
  componentDidMount() {
    this.inputRef.current.focus();
  }
  render() {
    return (
      <div className="login-page">
        <div className="login-page__form">
          <form className="login-page__form__form-grid">
            <div className="login-page__form__input-group">
              <input
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
                value={this.state.username}
                type="text"
                placeholder="username"
                required
                ref={this.inputRef}
              />
              <label htmlFor="name" className="login-page__form__label">
                username
              </label>
            </div>

            <input
              onChange={(e) => {
                this.setState({ pin: e.target.value });
              }}
              value={this.state.pin}
              maxLength="4"
              type="password"
              placeholder="password"
            />
            <button
              className="loginButton"
              onClick={(e) => {
                e.preventDefault();
                console.log();
                this.props.login(this.state.username, this.state.pin);
                this.setState({
                  username: '',
                  pin: '',
                });
              }}
            >
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
