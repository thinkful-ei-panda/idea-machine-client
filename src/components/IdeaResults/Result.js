import React from 'react'
import {useLocation} from 'react-router-dom'
import TokenService from '../../services/token-service';

const Result = (props) => {
    
  const {title,content,user_name,id,public_status,followed} = props.result

  let location = useLocation();

  return (
    <li id={id} className='idea'>
      <header>
        <h3>{title}</h3>
        {(location.pathname === '/' || location.pathname === '/tracked-ideas') && <h3>by {user_name}</h3>}
      </header>
      {(location.pathname === '/my-ideas' && public_status === false) && <button onClick = {e => props.handleMakePublicClick(e)} >Make public</button>}
      {(location.pathname === '/my-ideas' && public_status === true) && <button onClick = {e => props.handleMakePrivateClick(e)} >Make private</button>}
      {location.pathname === '/my-ideas' && <button onClick = {e => props.handleEditClick(e,props.history,title,content)}>Edit</button>}
      {location.pathname === '/my-ideas' && <button onClick = {e => props.handleDeleteClick(e)}>Delete</button>}
      {(location.pathname === '/' && TokenService.hasAuthToken() && !followed) && <button onClick = {e => props.handleFollowClick(e)}>Follow</button>}
      {(location.pathname === '/' && TokenService.hasAuthToken() && followed) && <div>Followed</div>}
      {location.pathname === '/tracked-ideas' && <button onClick = {e =>props.handleUnfollowClick(e)}>Unfollow</button>}
      <section>
        {content}
      </section>
    </li>
  )
}  

export default Result