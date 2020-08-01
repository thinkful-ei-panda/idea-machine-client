import React from 'react'
import TrackedIdeas from '../components/TrackedIdeas/TrackedIdeas'

class TrackedIdeasPage extends React.Component {

  render() {
    return (
      <div className='MyIdeasPage'>
        <h2>My Ideas</h2>
        <TrackedIdeas {...this.props}/>
      </div>
    )
  }
}

export default TrackedIdeasPage
