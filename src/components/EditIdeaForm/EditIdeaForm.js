import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

class EditIdeaForm extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
    editIdeaValues:{}
  }

  state = {
    error:null
  }

  handleEditIdeaFormSubmit = (ev,id) => {
    ev.preventDefault()
    this.setState({error:null})
    const {title,content} = ev.target

    fetch(`${config.API_ENDPOINT}/ideas/${id}`, {
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
      this.props.history.push('/my-ideas')
    })
    .catch(error => {
      this.setState({error:error.error})
    })    
  }

  render(){
    const {title, content,id} = this.props.editIdeaValues

    return (
      <div>
        <form onSubmit={ev =>this.handleEditIdeaFormSubmit(ev,id)}>
          <legend></legend>
          <fieldset>
            <div>
              <label htmlFor='title'>Title</label>
              <input id='title' name='title' defaultValue={title}/>
            </div>            
            <div>
              <label htmlFor='content'>Content</label>
              <textarea id='content' name='content' defaultValue={content}/>
            </div>           
            <button>Finish Edit</button>
          </fieldset>
        </form>
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    )
  }
}

export default EditIdeaForm