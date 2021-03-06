import React from 'react';
import {useLocation} from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Result.css';

const Result = (props) => {  
    
  const {title,content,user_name,id,public_status,followed} = props.result;

  let location = useLocation();

  return (
    <li id={id} className='idea'>
      <header>
        <h3>{title}</h3>
        {(location.pathname !== '/my-ideas') && <div>by {user_name}</div>}
      </header>
      <section>
        {content}
      </section>
      <div className='buttonsContainer'>

      {/* Conditionally render Follow, Unfollow, MakePublic, MakePrivate, Edit, and Delete buttons based off of which page the result component is being rendered in */}

      {(location.pathname === '/my-ideas' && public_status === false) && <div><button disabled={props.loading} onClick = {e => props.handleMakePublicClick(e)} >Make public</button></div>}
      {(location.pathname === '/my-ideas' && public_status === true) && <div><button disabled={props.loading} onClick = {e => props.handleMakePrivateClick(e)} >Make private</button></div>}
      {location.pathname === '/my-ideas' && <div><button disabled={props.loading} onClick = {e => props.handleEditClick(e,props.history,title,content) } className='secondary'>Edit</button></div>}
      {location.pathname === '/my-ideas' && <div><button disabled={props.loading} onClick = {e => props.handleDeleteClick(e)} className='secondary'>Delete</button></div>}
      {((location.pathname === '/' || location.pathname === '/home') && TokenService.hasAuthToken() && !followed) && <div><button disabled={props.loading} onClick = {e => props.handleFollowClick(e)}>Follow</button></div>}
      {((location.pathname === '/' || location.pathname === '/home') && TokenService.hasAuthToken() && followed) && <div>Followed</div>}
      {location.pathname === '/tracked-ideas' && <div><button disabled={props.loading} onClick = {e =>props.handleUnfollowClick(e)}>Unfollow</button></div>}
      </div>
    </li>
  );
}  

export default Result