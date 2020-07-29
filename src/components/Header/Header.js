import React from 'react'
import {Link} from 'react-router-dom'

import TokenService from '../../services/token-service'
import LoggedInNav from './LoggedInNav'
import NotLoggedInNav from './NotLoggedInNav'

class Header extends React.Component {  
  state = {
    loggedInStatus:false
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({loggedInStatus:false})
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
          ?<LoggedInNav handleLogout={this.props.handleLogout}/>
          :<NotLoggedInNav />}
      </nav>
    )
  }  
}

export default Header;