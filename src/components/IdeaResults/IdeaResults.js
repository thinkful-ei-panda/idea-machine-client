import React from 'react'
import Result from './Result'
import './IdeaResults.css'

const IdeaResults = (props) => {

  //Make rows of results
  let resultColumn=1;
  let resultRow=[];
  let results=[];
  for(let i=0; i<props.results.length-1; i++){
    const result = props.results[i]
    if(resultColumn<=3){
      resultRow.push(<Result {...props} key={result.id} result={result}/>)      
      resultColumn++
    }else{
      resultColumn=1;
      results.push(<ul key={i} className='resultRow'>{resultRow}</ul>)
      resultRow=[]
    }
  }

  // const results = props.results.map(result => <Result {...props} key={result.id} result={result}/>)
  return (
    <div className='results-container'>
      {results}
    </div>
  )
}

export default IdeaResults