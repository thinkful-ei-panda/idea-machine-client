import React from 'react';
import {NavLink} from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Nav.css';

class LoggedInNav extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.setState({});
  }

  render() {
    return (
      <nav className='Nav'>
        <NavLink to='/home'>
          <div>Home</div>
        </NavLink>
        <NavLink to='/my-ideas'>
          <div>My Ideas</div>
        </NavLink>
        <NavLink to='/tracked-ideas'>
          <div>Following</div>
        </NavLink>        
        <NavLink onClick={this.props.handleLogout} to='/login' >
          <div>Logout</div>
        </NavLink>
      </nav>
    )
  }  
}

export default LoggedInNav