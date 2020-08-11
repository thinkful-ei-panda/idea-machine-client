import React from 'react';
import MyIdeas from '../components/MyIdeas/MyIdeas';

class MyIdeasPage extends React.Component {

  render() {
    return (
      <div className='MyIdeasPage'>
        <h2 hidden>My Ideas</h2>
        <MyIdeas {...this.props}/>
      </div>
    );
  }
}

export default MyIdeasPage
