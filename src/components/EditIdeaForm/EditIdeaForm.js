import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './EditIdeaForm.css';

class EditIdeaForm extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
    editIdeaValues:{}
  }

  state = {
    error:null,
    loading:false,
  }

  handleEditIdeaFormSubmit = (ev,id) => {
    ev.preventDefault();
    this.setState({error:null,loading:true});
    const {title,content} = ev.target;

    fetch(`${config.API_ENDPOINT}/ideas/idea/${id}`, {
      method: 'PATCH',
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
    :res)
    .then(() => {
      this.setState({loading:false});
      this.props.history.push('/my-ideas');
    })
    .catch(error => {
      this.setState({error:error.error,loading:false});
    })    
  }

  render(){
    const {title, content,id} = this.props.editIdeaValues;

    return (
      <div>
        <form onSubmit={ev =>this.handleEditIdeaFormSubmit(ev,id)}>
          <legend>Edit Idea Form</legend>
          <fieldset>
            <div className='column'>
              <div className='formInputContainer'>
                <label htmlFor='title'>Title</label>
                <input id='title' name='title' defaultValue={title}/>
              </div>            
              <div className='formInputContainer'>
                <label htmlFor='content'>Content</label>
                <textarea id='content' name='content' defaultValue={content}/>
              </div>
              {this.state.error && <div className='error'>{this.state.error}</div>}
              {this.state.loading && <div className='loading'>Saving Edit...</div>}
              <div className='buttonContainer'>
                <button disabled={this.state.loading}>Finish Edit</button>
              </div>
            </div>
          </fieldset>
        </form>        
      </div>
    );
  }
}

export default EditIdeaForm