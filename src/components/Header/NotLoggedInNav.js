import React from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

const NotLoggedInNav = () => {
  return (
    <nav className='Nav'>
      <NavLink to='/home'>
        <div>Home</div>
      </NavLink>
      <NavLink to='/login'>
        <div>Login</div>
      </NavLink>
      <NavLink to='/register'>
        <div>Register</div>
      </NavLink>
    </nav>
  );
}

export default NotLoggedInNav