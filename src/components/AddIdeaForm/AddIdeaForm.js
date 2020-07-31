import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

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
            <div>
              <label htmlFor='title'>Title</label>
              <input id='title' name='title' />
            </div>            
            <div>
              <label htmlFor='content'>Content</label>
              <input id='content' name='content' />
            </div>           
            <button>Add Idea</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default AddIdeaForm