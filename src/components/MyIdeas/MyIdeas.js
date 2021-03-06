import React from 'react';
import {Link} from 'react-router-dom';
import Results from '../IdeaResults/IdeaResults';
import config from '../../config';
import TokenService from '../../services/token-service';
import './MyIdeas.css';

class MyIdeas extends React.Component {
  state = {
    results: [],
    error:null,
    loading:false,
  }

  //On mount, fetch the logged in user's ideas and store to state

  componentDidMount(){
    this.setState({loading:true});
    fetch(`${config.API_ENDPOINT}/ideas/my-ideas`, {
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
      this.setState({results:res,loading:false});
    })
    .catch(error => {
      this.setState({error:error,loading:false});
    })
  }

  //Handle make public button click, patch the idea in database to be public

  handleMakePublicClick = (e) => {
    this.setState({error:null,loading:true});
    const idea_id = e.target.closest('li').id;
    fetch(`${config.API_ENDPOINT}/ideas/idea/${idea_id}`,{
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

      //Update state with the patched idea as public

      const index = this.state.results.findIndex(result => result.id === Number(idea_id));
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id));
      let updatedResults = this.state.results;

      updatedIdea.public_status = true;
      updatedResults.splice(index,1,updatedIdea);

      this.setState({results: updatedResults,loading:false});
    })
    .catch(error => {
      this.setState({error,loading:false});
    })
  }
  
  //Handle make private button click, patch the idea in database to be private

  handleMakePrivateClick = (e) => {
    this.setState({error:null,loading:true});
    const idea_id = e.target.closest('li').id;
    fetch(`${config.API_ENDPOINT}/ideas/idea/${idea_id}`,{
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

      //Update state with patched idea

      const index = this.state.results.findIndex(result => result.id === Number(idea_id));
      let updatedIdea = this.state.results.find(result => result.id === Number(idea_id));
      let updatedResults = this.state.results;

      updatedIdea.public_status = false;
      updatedResults.splice(index,1,updatedIdea);

      this.setState({results: updatedResults,loading:false});
    })
    .catch(error => {
      this.setState({error,loading:false});
    })
  }

  //Handle delete button click, delete idea from database

  handleDeleteClick = (e) => {
    this.setState({error:null,loading:true});
    const id = e.target.closest('li').id;

    fetch(`${config.API_ENDPOINT}/ideas/idea/${id}`,{
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

      //Update state with deleted idea
      
      const newResults = this.state.results.filter(result => result.id !== Number(id));
      this.setState({results:newResults,loading:false});
    })
    .catch(error => {
      this.setState({error,loading:false});
    })
  }  

  render() {
    const {results} = this.state
    return (
      <>
        <div className='buttonContainer-add-idea'>
          <Link to='/add-idea'>
            <button disabled={this.state.loading}>Add Idea</button>
          </Link>
        </div>

        {this.state.error && <div className='error'>{this.state.error.error}</div>}
        {/* {this.state.loading && <div className='loading'>Loading...</div>} */}
        
        {results.length !== 0 && <Results {...this.props}
        handleMakePublicClick = {this.handleMakePublicClick} 
        handleMakePrivateClick = {this.handleMakePrivateClick}
        handleEditClick = {this.props.handleEditClick}
        handleDeleteClick = {this.handleDeleteClick}
        loading={this.state.loading}
        results={results} />}
      </>
    );
  }  
}

export default MyIdeas