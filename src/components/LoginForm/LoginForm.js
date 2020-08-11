import React from 'react';

import config from '../../config';
import TokenService from '../../services/token-service';
import './LoginForm.css';

class LoginForm extends React.Component {
  
  state={
    error:null,
    loading:false,
  }
  
  handleLoginSubmit = (ev) => {
    ev.preventDefault();
    this.setState({error:null,loading:true});
    const {username, password} = ev.target;

    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        user_name:username.value,
        password:password.value
      })
    })
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json())
    .then(res => {
      TokenService.saveAuthToken(res.authToken);
      username.value = '';
      password.value = '';
      this.setState({loading:false});
      this.props.onLoginSuccess();
    })
    .catch(error => {
      this.setState({error,loading:false});
    })
  }

  render() {
    const {error} = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleLoginSubmit} className="login-form">
          <legend></legend>
          <fieldset>
            <div className='column'>
              <div className="formInputContainer">
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
              </div>
              <div className="formInputContainer">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
              </div>
              {error && <div className='error'>{error.error}</div>}
              {this.state.loading && <div className='loading'>Signing In...</div>}
              <div className='buttonContainer'>
                <button disabled={this.state.loading}>Sign In</button>                
              </div>
            </div>
          </fieldset>
        </form>        
        
      </div>
    );
  }  
}

export default LoginForm