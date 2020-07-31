import React from 'react'
import {Link} from 'react-router-dom'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'
import TokenService from '../../services/token-service'

class MyIdeasPage extends React.Component {
  state = {
    results: [],
    error:null,
  }

  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/my-ideas`, {
      method: 'GET',
      headers:{
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => (!res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .then(res => {
      this.setState({results:res})
    })
    .catch(error => {
      this.setState({error:error})
    })
  }

  handleMakePublicClick = (e) => {
    this.setState({error:null})
    const idea_id = e.target.closest('li').id
    fetch(`${config.API_ENDPOINT}/ideas/${idea_id}`,{
      method:'PATCH',
      headers:{
        'content-type' : 'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        public_status:true
      })
    })
    .then(() => {
      const index = this.state.results.findIndex(result => result.id === Number(idea_id))
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id))
      let updatedResults = this.state.results

      updatedIdea.public_status = true      
      updatedResults.splice(index,1,updatedIdea)

      this.setState({results: updatedResults})
    })
    .catch(error => {
      this.setState({error})
    })
  }
  
  handleMakePrivateClick = (e) => {
    this.setState({error:null})
    const idea_id = e.target.closest('li').id
    fetch(`${config.API_ENDPOINT}/ideas/${idea_id}`,{
      method:'PATCH',
      headers:{
        'content-type' : 'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        public_status:false
      })
    })
    .then(res => !(res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res)
    .then(() => {
      const index = this.state.results.findIndex(result => result.id === Number(idea_id))
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id))
      let updatedResults = this.state.results

      updatedIdea.public_status = false
      updatedResults.splice(index,1,updatedIdea)

      this.setState({results: updatedResults})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  handleDeleteClick = (e) => {
    this.setState({error:null})
    const id = e.target.closest('li').id


    fetch(`${config.API_ENDPOINT}/ideas/${id}`,{
      method:'DELETE',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res => !(res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res)
    .then(() => {
      const newResults = this.state.results.filter(result => result.id !== Number(id))

      this.setState({results:newResults})
    })
    .catch(error => {
      this.setState({error})
    })
  }  

  render() {
    const {results} = this.state
    return (
      <div>
        <h2>My Ideas</h2>
        <Link to='/add-idea'>
          <button>Add Idea</button>
        </Link>

        {this.state.error && <div>{this.state.error.error}</div>}
        
        {results.length !== 0 && <Results {...this.props}
        handleMakePublicClick = {this.handleMakePublicClick} 
        handleMakePrivateClick = {this.handleMakePrivateClick}
        handleEditClick = {this.props.handleEditClick}
        handleDeleteClick = {this.handleDeleteClick}
        results={results} />}
      </div>
    )
  }  
}

export default MyIdeasPage