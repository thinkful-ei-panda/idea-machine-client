import React from 'react';
import AddIdeaForm from '../components/AddIdeaForm/AddIdeaForm';

class AddIdeaPage extends React.Component {

  render() {
    return (
      <div className='AddIdeaPage'>
        <h2>Add Idea</h2>
        <AddIdeaForm {...this.props}/>
      </div>
    );
  }
}

export default AddIdeaPage