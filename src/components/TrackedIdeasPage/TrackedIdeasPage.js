import React from 'react'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'

class TrackedIdeasPage extends React.Component{
  state = {
    results: [],
    error:null,
  }

  componentDidMount(){
    const user_id = 1
    fetch(`${config.API_ENDPOINT}/ideas/followed/${user_id}`)
    .then(res => (!res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .then(results => {
      this.setState({results})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  handleUnfollowClick = (e) => {
    console.log('unfollow')
  }

  render(){
    const {results} = this.state
    return (
      <div>Tracked Ideas Page
        {results.length !== 0 && <Results 
        handleUnfollowClick = {this.handleUnfollowClick}
        results={results} />}
      </div>
    )
  }  
}

export default TrackedIdeasPage