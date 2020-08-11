import React from 'react';
import {Link} from 'react-router-dom';

import TokenService from '../../services/token-service';
import LoggedInNav from './LoggedInNav';
import NotLoggedInNav from './NotLoggedInNav';
import './Header.css';

class Header extends React.Component {  
  state = {
    loggedInStatus:false
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({loggedInStatus:false});
  }

  render() {
    return (
      <header className='Header'>
        <h1>
          <Link to='/home'>
            ID8
          </Link>
        </h1>
        <div className='NavContainer'>
          {TokenService.hasAuthToken()
            ?<LoggedInNav handleLogout={this.props.handleLogout}/>
            :<NotLoggedInNav />}
        </div>
      </header>
    );
  }  
}

export default Header;