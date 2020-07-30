import React from 'react'
import Results from '../IdeaResults/IdeaResults';
import config from '../../config';
import TokenService from '../../services/token-service';

class SearchBar extends React.Component {

  state = {
    results: [],
    error:null,
  }

  handleSearchIdeasSubmit = (ev) => {
    ev.preventDefault()
    fetch(`${config.API_ENDPOINT}/ideas`)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json())
    .then(res => {
      let results = res
      if(TokenService.hasAuthToken){        

        //Add followed key with a value of true if the idea is followed by the logged in user

        fetch(`${config.API_ENDPOINT}/followedIdeas`,{
          method: 'GET',
          headers: {
            'content-type':'application/json',
            'Authorization':`bearer ${TokenService.getAuthToken()}`
          }
        })
        .then(res => (!res.ok)
        ?res.json().then(e => Promise.reject(e))
        :res.json())
        .then(trackedResults => {
          console.log('here 1')          

          let followed = results.filter(result => {
            let check;
            trackedResults.forEach(trackedResult => {
              if(trackedResult.id === result.id)
                check = true
            })
            return check
          })
          
          const notFollowed = results.filter(result => {
            let check=true
            trackedResults.forEach(trackedResult => {
              if(trackedResult.id === result.id)
                check = false
            })
            return check
          })

          const followedWithFollowed = followed.map(idea => {
            idea.followed = true
            return idea
          })

          results = [...followedWithFollowed,...notFollowed]

          //Remove results that are made by the logged in user
          console.log('here 2', results)

          // const payload = window.atob(TokenService.getAuthToken().split('.')[1])
          // const user_name = payload.user_name

          // console.log(user_name)
          
          // results = results.filter(idea => idea.user_name !== user_name)

          this.setState({results})
        })
        .catch(error => {
          console.log(error)
          this.setState({error})
        })

      } else {
        
        this.setState({results})
      }      
    })
    .catch(error => {
      console.log(error)
      this.setState({error})
    })
  }

  handleFollowClick = (e) => {    
    const idea_id = e.target.closest('li').id

    fetch(`${config.API_ENDPOINT}/followedIdeas`,{
      method: 'POST',
      headers: {
        'content-type':'application/json',
        'Authorization':`bearer ${TokenService.getAuthToken()}`
      },
      body:JSON.stringify({
        idea_id,
      })
    })
    .then(res => !(res.ok)
    ?res.json().then(e => Promise.reject(e))
    :res.json())
    .then(followedIdea => {
      followedIdea.followed = true
      const index = this.state.results.findIndex(idea => idea.id === followedIdea.id)
      
      let newResults = this.state.results
      newResults.splice(index,1,followedIdea)      

      this.setState({results:newResults})
    })
  }

  render() {
    const {results} = this.state

    return (
      <div className="search-container-center">
        <form onSubmit={this.handleSearchIdeasSubmit} className="search-form-center">
          <legend></legend>
          <fieldset>
            <div className="row">
              <div>
                <label hidden="" htmlFor="searchBar">Search</label>
                <input name="searchBar" id="searchBar" />
              </div>
              <div>
                <button>Search</button>
              </div>
            </div>
          </fieldset>
        </form>
        {this.state.error && <div>{this.state.error}</div>}
        {results.length !== 0 && <Results 
        handleFollowClick = {this.handleFollowClick}
        results={results} 
        />}
      </div>
    )
  }  
}

export default SearchBar;