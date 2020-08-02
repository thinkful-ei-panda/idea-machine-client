import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import './AddIdeaForm.css'

class AddIdeaForm extends React.Component {
  state={
    error:null
  }

  handleAddIdeaFormSubmit = (ev) => {
    ev.preventDefault()
    this.setState({error:null})

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
      this.props.history.push('/my-ideas')
    })
    .catch(error => {
      this.setState({error})
    })    
  }

  render(){
    return (
      <div>
        {this.state.error && <div>{this.state.error.error}</div>}
        <form onSubmit={this.handleAddIdeaFormSubmit}>
          <legend></legend>
          <fieldset>
            <div className='formInputContainer'>
              <label htmlFor='title'>Title</label>
              <input id='title' name='title' />
            </div>
            <div className='formInputContainer'>
              <label htmlFor='content'>Content</label>
              <textarea id='content' name='content' />
            </div>
            <div className='buttonContainer'>
              <button>Add Idea</button>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default AddIdeaForm