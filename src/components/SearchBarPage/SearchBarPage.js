import React from 'react'

const SearchBar = () => {
  return (
    <div className="search-container-center">
      <form className="search-form-center">
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
    </div>
  )
}

export default SearchBar;