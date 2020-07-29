import React from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'

class LoggedInNav extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    this.setState({})
  }

  render() {
    return (
      <div>
        <Link to='/my-ideas'>
          My Ideas
        </Link>
        <Link to='/tracked-ideas'>
          Tracked Ideas
        </Link>
        <Link onClick={this.props.handleLogout} to='/' >
          Logout
        </Link>
      </div>
    )
  }  
}

export default LoggedInNav