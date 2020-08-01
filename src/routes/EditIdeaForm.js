import React from 'react'
import EditIdeaForm from '../components/EditIdeaForm/EditIdeaForm'

class EditIdeaPage extends React.Component {

  render() {
    return (
      <div className='AddIdeaPage'>
        <h2>Add Idea</h2>
        <EditIdeaForm {...this.props}/>
      </div>
    )
  }
}

export default EditIdeaPage