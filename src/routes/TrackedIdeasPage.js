import React from 'react'
import TrackedIdeas from '../components/TrackedIdeas/TrackedIdeas'

class TrackedIdeasPage extends React.Component {

  render() {
    return (
      <div className='TrackedIdeasPage'>
        <TrackedIdeas {...this.props}/>
      </div>
    )
  }
}

export default TrackedIdeasPage
