import React from 'react'
import {useLocation} from 'react-router-dom'

const Result = (props) => {
  const {title,content,user_name} = props.result
  let location = useLocation();

  return (
    <li className='idea'>
      <header>
        <h3>{title}</h3>
        {(location.pathname === '/' || location.pathname === '/tracked-ideas') && <h3>by {user_name}</h3>}
      </header>
      {location.pathname === '/my-ideas' && <button>Make public</button>}
      {location.pathname === '/my-ideas' && <button>Delete</button>}
      {location.pathname === '/' && <button>Follow</button>}
      {location.pathname === '/tracked-ideas' && <button>Unfollow</button>}
      <section>
        {content}
      </section>
    </li>
  )
}

export default Result