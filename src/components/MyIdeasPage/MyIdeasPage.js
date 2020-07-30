import React from 'react'
import {Link} from 'react-router-dom'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'
import TokenService from '../../services/token-service'

class MyIdeasPage extends React.Component {
  state = {
    results: [{id:1,title:'some title',content:'some content'}],
    error:null,
  }

  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/ideas/user/my-ideas`, {
      method: 'GET',
      headers:{
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`
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
      console.log(error)
      this.setState({error})
    })
  }
  
  handleMakePrivateClick = (e) => {
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
    .then(() => {
      const index = this.state.results.findIndex(result => result.id === Number(idea_id))
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id))
      let updatedResults = this.state.results

      updatedIdea.public_status = false
      updatedResults.splice(index,1,updatedIdea)

      this.setState({results: updatedResults})
    })
    .catch(error => {
      console.log(error)
      this.setState({error})
    })
  }

  handleDeleteClick = (e) => {
    console.log('delete', e.target.closest('li').id)
    const id = e.target.closest('li').id


    fetch(`${config.API_ENDPOINT}/ideas/${id}`,{
      method:'DELETE',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(() => {
      const newResults = this.state.results.filter(result => result.id !== Number(id))

      this.setState({results:newResults})
    })
    .catch(error => {
      this.setState({error})
    })
  }
  
  handleEditClick = () => {
    console.log('edit')
  }

  render() {
    const {results} = this.state
    return (
      <div>
        <h2>My Ideas</h2>
        <Link to='/add-idea'>
          <button>Add Idea</button>
        </Link>
        
        {results.length !== 0 && <Results 
        handleMakePublicClick = {this.handleMakePublicClick} 
        handleMakePrivateClick = {this.handleMakePrivateClick}
        handleEditClick = {this.handleEditClick}
        handleDeleteClick = {this.handleDeleteClick}
        results={results} />}
      </div>
    )
  }  
}

export default MyIdeasPage