import React from 'react'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'
import TokenService from '../../services/token-service'

class TrackedIdeasPage extends React.Component{
  state = {
    results: [],
    error:null,
  }

  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/followedIdeas`,{
      method: 'GET',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
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
    console.log('unfollow',e.target.closest('li').id)

    const idea_id = e.target.closest('li').id

    fetch(`${config.API_ENDPOINT}/followedIdeas/${idea_id}`,{
      method: 'DELETE',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body:JSON.stringify({
        follower_id:TokenService.getPayloadFromToken.user_id
      })
    })
    .then(() => {
      const newResults = this.state.results.filter(result => result.id !== Number(idea_id))
      this.setState({results:newResults})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render(){
    const {results} = this.state
    return (
      <div>
        <h2>Tracked Ideas</h2>
        {this.state.error && <div>{this.state.error.error}</div>}
        {results.length !== 0 && <Results 
        handleUnfollowClick = {this.handleUnfollowClick}
        results={results} />}
      </div>
    )
  }
}

export default TrackedIdeasPage