import React from 'react'
import Results from '../Results/Results'

class MyIdeasPage extends React.Component {
  state = {
    results: [1]
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