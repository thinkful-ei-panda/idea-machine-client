import React from 'react'
import {Link} from 'react-router-dom'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'

class MyIdeasPage extends React.Component {
  state = {
    results: [{id:1,title:'some title',content:'some content'}],
    error:null,
  }

  componentDidMount(){
    const user_id = 1;
    fetch(`${config.API_ENDPOINT}/ideas/user/${user_id}`)
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
    console.log('HERE')
    const idea_id = e.target.closest('li').id
    fetch(`${config.API_ENDPOINT}/ideas/${idea_id}`,{
      method:'PATCH',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        public_status:true
      })
    })
    .then(() => {
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id))
      let updatedResults = this.state.results.filter(result => result.id !== Number(idea_id))

      updatedResults.push (updatedIdea)      
      updatedIdea.public_status = true      

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
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        public_status:false
      })
    })
    .then(() => {
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id))
      let updatedResults = this.state.results.filter(result => result.id !== Number(idea_id))

      updatedResults.push (updatedIdea)      
      updatedIdea.public_status = false

      this.setState({results: updatedResults})
    })
    .catch(error => {
      console.log(error)
      this.setState({error})
    })
  }

  handleDeleteClick = () => {
    console.log('delete')

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