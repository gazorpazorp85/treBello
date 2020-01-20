import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  // loadUsers,
  // removeUser,
  login,
  logout,
  signup
} from '../actions/UserActions';

class Login extends Component {
  state = {
    msg: '',
    loginCred: {
      email: '',
      password: ''
    },
    signupCred: {
      email: '',
      password: '',
      username: ''
    }
  };

  componentDidMount() {
    if (this.props.loggedInUser) this.props.logout();
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
    // this.props.toggleLogin();
  };

  doSignup = async ev => {
    ev.preventDefault();
    const { email, password, username } = this.state.signupCred;
    if (!email || !password || !username) {
      return this.setState({ msg: 'All inputs are required!' });
    }
    const signupCreds = { email, password, username };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { email: '', password: '', username: '' } });
    this.props.toggleLogin();
  };

  doLogout = () => {
    this.props.logout();
  }

  doStopPropagation = (ev) => {
    ev.stopPropagation();
  }

  render() {
    let signupSection = (
      <form className="login-container-signup text-center" onSubmit={this.doSignup}>
        <p>Not a member yet? Sign up!</p>
        <input
          type="text"
          name="email"
          value={this.state.signupCred.email}
          onChange={this.signupHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
        />
        <br />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
        />
        <br />
        <button className="login-container-signup-btn">Signup</button>
      </form>
    );
    let loginSection = (
      <form className="login-container-login text-center" onSubmit={this.doLogin}>
        <p> login: </p>
        <input
          type="text"
          name="email"
          value={this.state.loginCred.email}
          onChange={this.loginHandleChange}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br />
        <button className="login-container-login-btn">Login</button>
      </form>
    );

    const { loggedInUser } = this.props;

    return (


      <div className= { "login-container flex column align-center" 
      + (this.props.toggleState ? ' translateLeft' : '' )}
      style={this.props.style} 
      onClick={this.doStopPropagation}>
      
      
        <div className="login-container-logo">
        </div>
        <h2>{this.state.msg}</h2>
        <div className={ "login-container-form-container" }>
          {loggedInUser && (
            <div>
              <h2>Welcome: {loggedInUser.username} </h2>
              <button onClick={this.doLogout}>Logout</button>
            </div>
          )}

          {loginSection}
          <hr />
          {signupSection}
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};

const mapDispatchToProps = {
  login,
  logout,
  signup
  // removeUser,
  // loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
