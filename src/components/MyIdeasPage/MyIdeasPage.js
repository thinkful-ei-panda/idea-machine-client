import React from 'react'
import Results from '../IdeaResults/IdeaResults'
import config from '../../config'

class MyIdeasPage extends React.Component {
  state = {
    results: [{id:1,title:'some title',content:'some content'}],
    error:null,
  }

  componentDidMount(){
    fetch(`${config.API_ENDPOINT}/ideas/my-ideas`)
    .then(res => (!res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .then(res => {
      this.setState({results:res})
    })
    .catch(error => {
      this.setState({error:error})
    })
  }

  render() {
    const {results} = this.state
    return (
      <div>
        My Ideas Page
        {results.length !== 0 && <Results results={results} />}
      </div>
    )
  }  
}

export default MyIdeasPage