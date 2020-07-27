import React from 'react'
import Results from '../Results/Results';

class SearchBar extends React.Component {

  state = {
    results:[]
  }
  handleSearchIdeasSubmit = (ev) => {
    ev.preventDefault()
    // fetch(`${}`)

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
        {results.length !== 0 && <Results results={results} />}
      </div>
    )
  }  
}

export default SearchBar;