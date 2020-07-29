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
      const user_name='dunder'
      let results
      if(TokenService.hasAuthToken){
        results = res.filter(idea => idea.user_name !== user_name)
      } else {
        results = res
      }
      this.setState({results})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  handleFollowClick = (e) => {
    console.log('follow')
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
        {results.length !== 0 && <Results 
        handleFollowClick = {this.handleFollowClick}
        results={results} 
        />}
      </div>
    )
  }  
}

export default SearchBar;