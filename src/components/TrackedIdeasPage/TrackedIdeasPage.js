import React from 'react'
import Results from '../IdeaResults/IdeaResults'
// import config from '../../config'

class TrackedIdeasPage extends React.Component{
  state = {
    results: [{id:1,title:'some title',content:'some content'}]
  }

  // componentDidMount(){
  //   const user_id = 1
  //   fetch(`${config.API_ENDPOINT}/ideas/user/${user_id}/tracked`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type' : 'application/json'
  //     },
  //   })
  // }

  render(){
    const {results} = this.state
    return (
      <div>Tracked Ideas Page
        {results.length !== 0 && <Results results={results} />}
      </div>
    )
  }  
}

export default TrackedIdeasPage