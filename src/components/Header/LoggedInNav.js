import React from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Nav.css'

class LoggedInNav extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.setState({})
  }

  render() {
    return (
      <nav className='Nav'>
        <div className='navTab'>
          <Link to='/my-ideas'>
            My Ideas
          </Link>
        </div>
        <div className='navTab'>
          <Link to='/tracked-ideas'>
            Tracked Ideas
          </Link>
        </div>
        <Link onClick={this.props.handleLogout} to='/' >
          Logout
        </Link>
      </nav>
    )
  }  
}

export default LoggedInNav