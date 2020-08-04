import React from 'react'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'
import TokenService from '../../services/token-service'

class TrackedIdeas extends React.Component{
  state = {
    results: [],
    error:null,
    loading:false,
  }

  componentDidMount(){
    this.setState({loading:true})
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
      this.setState({results,loading:false})
    })
    .catch(error => {
      this.setState({error,loading:false})
    })
  }

  handleUnfollowClick = (e) => {
    this.setState({loading:true})
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
      this.setState({results:newResults,loading:false})
    })
    .catch(error => {
      this.setState({error,loading:false})
    })
  }

  render(){
    const {results} = this.state
    return (
      <>        
        {this.state.error && <div className='error'>{this.state.error.error}</div>}
        {/* {this.state.loading && <div className='loading'>Loading...</div>} */}
        {results.length !== 0 && <Results 
        handleUnfollowClick = {this.handleUnfollowClick}
        loading={this.state.loading}
        results={results} />}
      </>
    )
  }
}

export default TrackedIdeas