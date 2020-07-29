import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header'
import SearchBarPage from './components/SearchBarPage/SearchBarPage'
import LoginPage from './routes/LoginPage/LoginPage'
import MyIdeasPage from './components/MyIdeasPage/MyIdeasPage';
import TrackedIdeasPage from './components/TrackedIdeasPage/TrackedIdeasPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import AddIdeaPage from './routes/AddIdeaPage/AddIdeaPage';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import PrivateRoute from './components/Utils/PrivateRoute';
import TokenService from './services/token-service';


class App extends React.Component {
  state = {
    loggedInToggle:false
  }

  handleLogIn = () => {
    this.setState({loggedInToggle:true})
  }

  handleLogout = () => {
    // console.log('here')
    TokenService.clearAuthToken()
    this.setState({loggedInToggle:false})
  }

  render(){
    return (
      <div className="App">
        <header className='App__header'>
          <Header loggedInToggle={this.state.loggedInToggle}  handleLogout={this.handleLogout} />
        </header>
        <main>
          <Switch>
            <Route
            exact
            path='/'
            component={SearchBarPage} />
  
            <Route
            exact
            path='/login'
            render={props => <LoginPage props={props} handleLogIn={this.handleLogIn}/>}
            />            
  
            <PublicOnlyRoute
            exact
            path='/register'
            component={RegistrationPage} />
  
            <PrivateRoute
            exact
            path='/my-ideas'
            component={MyIdeasPage} />
  
            <PrivateRoute
            exact
            path='/add-idea'
            component={AddIdeaPage} />
  
            <PrivateRoute
            exact
            path='/tracked-ideas'
            component={TrackedIdeasPage} />
  
          </Switch>
        </main>
      </div>
    );
  } 
}

export default App;
