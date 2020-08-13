import React from 'react';
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

  //Handle inspiration button click

  handleSearchIdeasSubmit = (ev) => {
    ev.preventDefault();
    this.setState({loading:true});

    //Fetch public ideas

    fetch(`${config.API_ENDPOINT}/ideas`)
    .then(res => (!res.ok)
    ? res.json().then(e => Promise.reject(e))
    : res.json())
    .then(res => {
      let results = res;
      if(TokenService.hasAuthToken()){        

        //If logged in, fetch followed ideas in order to render follow button/followed text

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
                check = true;
            })
            return check;
          });
          
          const notFollowed = results.filter(result => {
            let check=true;
            trackedResults.forEach(trackedResult => {
              if(trackedResult.id === result.id)
                check = false;
            });
            return check;
          })

          const followedWithFollowed = followed.map(idea => {
            idea.followed = true;
            return idea;
          })

          results = [...followedWithFollowed,...notFollowed];

          //Remove results that are made by the logged in user          

          new Promise((resolve, reject) => {            
            const payload = window.atob(TokenService.getAuthToken().split('.')[1]);
            resolve (payload);
          })
          .then(payload => {
            const user_name = JSON.parse(payload).sub;
                      
            results = results.filter(idea => idea.user_name !== user_name);
            this.setState({results,loading:false});
          })
          .catch(error => {            
            this.setState({error,loading:false});
          })
        })
        .catch(error => {
          
          this.setState({error,loading:false});
        })

      } else {
        
        this.setState({results,loading:false});
      }      
    })
    .catch(error => {
      
      this.setState({error,loading:false});
    })
  }

  //Handle follow button click

  handleFollowClick = (e) => {    
    this.setState({loading:true});
    
    const idea_id = e.target.closest('li').id;

    //Post idea to followed ideas in database

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
      followedIdea.followed = true;
      const index = this.state.results.findIndex(idea => idea.id === followedIdea.id);
      
      let newResults = this.state.results;
      newResults.splice(index,1,followedIdea);

      this.setState({results:newResults,loading:false});
    })
    .catch(error => {
      this.setState({error,loading:false});
    })
  }

  //Render component

  render() {
    const {results} = this.state;

    return (
      <div className="Landing-Page">

        {/* Conditionally render instructions, and inspiration button when there haven't been fetched results */}
        
        {this.state.results.length === 0 
        && <section className='instructions'>
            <p>Save ideas and get inspired</p>
            <p>ID8 is an app to assist developers early on in the develpment process.</p>            
            <p>You can save, edit or delete ideas, and make them publicly viewable.</p>
            <p>You can view other user's public ideas and follow them to return to later.</p>
            <p>ID8 will eventually become a hub for new developers looking for project ideas to complete and add to their portfolios</p>
            <p>Future features will include linking repos with idea implementations and ratings</p>
            <p>Demo Login:</p>
            <p>username: dunder</p>
            <p>password: password</p>
          </section>}

        {this.state.results.length === 0 && <button disabled={this.state.loading} onClick={this.handleSearchIdeasSubmit}>Inspiration</button>}

        {/* Conditionally render fetched results after button is clicked*/}

        {this.state.results.length !== 0 && <h2>Public Ideas</h2>}

        {/* Display user feedback for loading and errors */}

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