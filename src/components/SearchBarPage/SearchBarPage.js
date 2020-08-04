import React from 'react'
import Results from '../IdeaResults/IdeaResults';
import config from '../../config';
import TokenService from '../../services/token-service';
import './SearchBarPage.css';

class SearchBar extends React.Component {

  state = {
    results: [],
    error:null,
    loading:false,
  }

  handleSearchIdeasSubmit = (ev) => {
    ev.preventDefault()
    this.setState({loading:true})
    fetch(`${config.API_ENDPOINT}/ideas`)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json())
    .then(res => {
      let results = res
      if(TokenService.hasAuthToken()){        

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

          new Promise((resolve, reject) => {            
            const payload = window.atob(TokenService.getAuthToken().split('.')[1])
            resolve (payload)                       
          })
          .then(payload => {
            const user_name = JSON.parse(payload).sub
                      
            results = results.filter(idea => idea.user_name !== user_name)
            this.setState({results,loading:false})
          })
          .catch(error => {            
            this.setState({error,loading:false})
          })
        })
        .catch(error => {
          
          this.setState({error,loading:false})
        })

      } else {
        
        this.setState({results,loading:false})
      }      
    })
    .catch(error => {
      
      this.setState({error,loading:false})
    })
  }

  handleFollowClick = (e) => {    
    this.setState({loading:true})
    
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

      this.setState({results:newResults,loading:false})
    })
    .catch(error => {
      this.setState({error,loading:false})
    })
  }

  render() {
    const {results} = this.state

    return (
      <div className="Landing-Page">
        
        {this.state.results.length === 0 && <section className='instructions'>Save ideas and get inspired</section>}
        {/* <p>After making an account, you can save, edit or delete ideas, and make them publicly viewable.</p>
        <p>You can search for other user's public ideas and follow them to come back to later.</p> */}
        

        {/* <form onSubmit={this.handleSearchIdeasSubmit} className="search-form-center">
          <legend></legend>
          <fieldset>
            <div className="row">
              <div>
                <label hidden="" htmlFor="searchBar">Search</label>
                <input name="searchBar" id="searchBar" placeholder="currently gets all public ideas"/>
              </div>
              <div>
                <button>Search</button>
              </div>
            </div>
          </fieldset>
        </form> */}

        {this.state.results.length === 0 && <button disabled={this.state.loading} onClick={this.handleSearchIdeasSubmit}>Inspiration</button>}
        {this.state.results.length !== 0 && <h2>Public Ideas</h2>}
        {this.state.error && <div className='error'>{this.state.error.error}</div>}
        {this.state.loading && <div className='loading'>Loading...</div>}
        {results.length !== 0 && <Results 
        handleFollowClick = {this.handleFollowClick}
        loading={this.state.loading}
        results={results} 
        />}
      </div>
    )
  }  
}

export default SearchBar;