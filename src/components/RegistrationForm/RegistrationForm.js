import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class RegistrationForm extends React.Component {
  state = {
    error:null
  }

  handleRegistrationSubmit = (ev) => {
    ev.preventDefault()
    this.setState({error:null})
    const {username, password} = ev.target
    fetch(`${config.API_ENDPOINT}/users`, {
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
    .then(() => {

      //After registering, logs in
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

        //toggle logged in state
        this.props.handleLogIn(this.props.history)
      })
      .catch(error => {
        this.setState({error})
      })      
    })
    .catch(error => {
      this.setState({error})
    })
  }


  render() {
    const {error} = this.state

    return (
      <div className="login-container">
        <form onSubmit={this.handleRegistrationSubmit} className="login-form">
          <legend></legend>
          <fieldset>
            <div className="column">
              <div>
                <label htmlFor="username">Username:</label>
                <input name="username" id="username" />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input name="password" id="password" />
              </div>
              <div>
                <button>Register</button>
              </div>
            </div>
          </fieldset>
        </form>
        {error && <div>{error.error}</div>}
      </div>
    )
  }  
}

export default RegistrationForm