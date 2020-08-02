import React from 'react'
import Result from './Result'
import './IdeaResults.css'

const IdeaResults = (props) => {
  const results = props.results.map(result => <Result {...props} key={result.id} result={result}/>)
  return (
    <ul className='results-container'>
      {results}
    </ul>
  )
}

export default IdeaResults