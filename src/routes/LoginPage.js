import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    this.props.handleLogIn(this.props.history);
  }

  render() {
    return (
      <div className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </div>
    );
  }
}

export default LoginPage