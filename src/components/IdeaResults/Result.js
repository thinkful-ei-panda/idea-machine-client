import React from 'react'
import {useLocation} from 'react-router-dom'
import TokenService from '../../services/token-service';
import './Result.css';

const Result = (props) => {
    
  const {title,content,user_name,id,public_status,followed} = props.result

  let location = useLocation();

  return (
    <li id={id} className='idea'>
      <header>
        <h3>{title}</h3>
        {(location.pathname === '/' || location.pathname === '/tracked-ideas') && <div>by {user_name}</div>}
      </header>
      <section>
        {content}
      </section>
      <div className='buttonsContainer'>
      {(location.pathname === '/my-ideas' && public_status === false) && <div><button onClick = {e => props.handleMakePublicClick(e)} >Make public</button></div>}
      {(location.pathname === '/my-ideas' && public_status === true) && <div><button onClick = {e => props.handleMakePrivateClick(e)} >Make private</button></div>}
      {location.pathname === '/my-ideas' && <div><button onClick = {e => props.handleEditClick(e,props.history,title,content) } className='secondary'>Edit</button></div>}
      {location.pathname === '/my-ideas' && <div><button onClick = {e => props.handleDeleteClick(e)} className='secondary'>Delete</button></div>}
      {(location.pathname === '/' && TokenService.hasAuthToken() && !followed) && <div><button onClick = {e => props.handleFollowClick(e)}>Follow</button></div>}
      {(location.pathname === '/' && TokenService.hasAuthToken() && followed) && <div>Followed</div>}
      {location.pathname === '/tracked-ideas' && <div><button onClick = {e =>props.handleUnfollowClick(e)}>Unfollow</button></div>}
      </div>
    </li>
  )
}  

export default Result