import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    // const { location, history } = this.props
    
    // const destination = (location.state || {}).from || '/'

    // console.log(location.state.from)

    //toggle logged in state
    this.props.handleLogIn(this.props.history)

    // history.push(destination)
  }

  render() {
    return (
      <div className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </div>
    )
  }
}

export default LoginPage