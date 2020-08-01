import React from 'react'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'

class RegistrationPage extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className='RegistrationPage'>
        <h2>Create Account</h2>
        <RegistrationForm {...this.props}/>
      </div>
    )
  }
}

export default RegistrationPage