import React from 'react'
import Result from './Result'

const Results = (props) => {
  const results = props.results.map(result => <Result key={result.id}/>)
  return (
    <div>
      {results}
    </div>
  )
}

export default Results