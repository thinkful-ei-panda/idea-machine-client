import React from 'react'
import config from '../../config'

class AddIdeaForm extends React.Component {
  handleAddIdeaFormSubmit = (ev) => {
    ev.preventDefault()
    const {title,content} = ev.target

    fetch(`${config.API_ENDPOINT}/ideas`, {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify({
        title:title.value,
        content:content.value
      })
    })
    .then(res => (!res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .catch(error => {
      this.setState({error})
    })    
  }

  render(){
    return (
      <div>
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