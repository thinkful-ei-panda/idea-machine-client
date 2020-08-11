import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './AddIdeaForm.css';

class AddIdeaForm extends React.Component {
  state={
    error:null,
    loading:false
  }

  //Handle add idea submit, post new idea to database

  handleAddIdeaFormSubmit = (ev) => {
    ev.preventDefault();
    this.setState({error:null,loading:true});

    const {title,content} = ev.target

    fetch(`${config.API_ENDPOINT}/ideas`, {
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`,
      },
      body:JSON.stringify({
        title:title.value,
        content:content.value
      })
    })
    .then(res => (!res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .then(() => {
      this.setState({loading:false});
      this.props.history.push('/my-ideas');
    })
    .catch(error => {
      this.setState({error,loading:false});
    })    
  }

  render(){
    const error = this.state.error;
    return (
      <div>
        {this.state.error && <div className='error'>{this.state.error.error}</div>}
        <form onSubmit={this.handleAddIdeaFormSubmit}>
          <legend hidden>Add Idea Form</legend>
          <fieldset>
            <div className='column'>
              <div className='formInputContainer'>
                <label htmlFor='title'>Title</label>
                <input id='title' name='title' />
              </div>
              <div className='formInputContainer'>
                <label htmlFor='content'>Content</label>
                <textarea id='content' name='content' />
              </div>
              {error && <div className='error'>{error.error}</div>}
              {this.state.loading && <div className='loading'>Adding Idea...</div>}
              <div className='buttonContainer'>
                <button disabled={this.state.loading}>Add Idea</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddIdeaForm