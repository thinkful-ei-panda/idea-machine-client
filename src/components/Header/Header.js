import React from 'react'
import {Link} from 'react-router-dom'

import TokenService from '../../services/token-service'

class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLoggedInLink(){
    return (
      <div>
        <Link to='/my-ideas'>
          My Ideas
        </Link>
        <Link to='/tracked-ideas'>
          Tracked Ideas
        </Link>
        <Link onClick={this.handleLogoutClick} to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink(){
    return (
      <div>
        <Link to='/login'>
          Login
        </Link>
        <Link to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='Header'>
        <h1>
          <Link to='/'>
            Idea Machine
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ?this.renderLoggedInLink()
          :this.renderLoginLink()}
      </nav>
    )
  }  
}

export default Header;