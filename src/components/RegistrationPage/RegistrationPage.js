import React from 'react'

class RegistrationPage extends React.Component {

  handleRegistrationSubmit = (ev) => {
    ev.preventDefault()

  }


  render() {
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
        {/* {error && <div>{error}</div>} */}
      </div>
    )
  }  
}

export default RegistrationPage