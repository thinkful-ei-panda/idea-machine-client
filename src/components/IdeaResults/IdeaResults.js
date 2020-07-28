import React from 'react'
import Result from './Result'

const IdeaResults = (props) => {
  const results = props.results.map(result => <Result key={result.id} result={result}/>)
  return (
    <ul className='results-container'>
      {results}
    </ul>
  )
}

export default IdeaResults