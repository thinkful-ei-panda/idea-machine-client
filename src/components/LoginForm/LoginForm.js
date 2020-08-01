import React from 'react'

import config from '../../config'
import TokenService from '../../services/token-service'

class LoginForm extends React.Component {
  
  state={
    error:null
  }
  
  handleLoginSubmit = (ev) => {
    ev.preventDefault()
    this.setState({error:null})
    const {username, password} = ev.target

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
      TokenService.saveAuthToken(res.authToken)
      username.value = ''
      password.value = ''
      this.props.onLoginSuccess()
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render() {
    const {error} = this.state
    return (
      <div className="login-container">
        <form onSubmit={this.handleLoginSubmit} className="login-form">
          <legend></legend>
          <fieldset>
            <div className="column">
              <div>
                <label htmlFor="username">Username:</label>
                <input name="username" id="username" />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
              </div>
              <div>
                <button>Sign In</button>
              </div>
            </div>
          </fieldset>
        </form>        
        {error && <div>{error}</div>}
      </div>
    )
  }  
}

export default LoginForm