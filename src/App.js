import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header'
import SearchBarPage from './components/SearchBarPage/SearchBarPage'
import LoginPage from './routes/LoginPage'
import AddIdeaPage from './routes/AddIdeaPage';

import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import PrivateRoute from './components/Utils/PrivateRoute';
import TokenService from './services/token-service';
import MyIdeasPage from './routes/MyIdeasPage';
import TrackedIdeasPage from './routes/TrackedIdeasPage';
import RegistrationPage from './routes/RegistrationPage';
import EditIdeaPage from './routes/EditIdeaForm';



class App extends React.Component {
  state = {
    loggedInToggle:false,
    editIdeaValues: {
      title:null,
      content:null
    }
  }

  handleLogIn = (history) => {
    this.setState({loggedInToggle:true})

    history.push('/')
  }

  handleLogout = () => {
    TokenService.clearAuthToken()
    this.setState({loggedInToggle:false})
  }

  handleEditClick = (e,history,title,content) => {
    this.setState({editIdeaValues: {
      title,
      content,
      id: e.target.closest('li').id,
    }},() => history.push('/edit-idea-page'))
  }

  render(){
    return (
      <div className="App">
        <Header loggedInToggle={this.state.loggedInToggle}  handleLogout={this.handleLogout} />
        <main>
          <Switch>
            <Route
            exact
            path='/'
            component={SearchBarPage} />
  
            <PublicOnlyRoute
            exact
            path='/login'
            component={props => <LoginPage {...props} handleLogIn={this.handleLogIn}/>}
            />

            <PublicOnlyRoute
            exact
            path='/register'
            handleLogIn={this.handleLogIn}
            component={props => <RegistrationPage {...props} handleLogIn={this.handleLogIn}/>}             
            />

            <PrivateRoute
            exact
            path='/my-ideas'            
            component = {props => <MyIdeasPage {...props} handleEditClick={this.handleEditClick}/> }
            />
            
            <PrivateRoute
            exact
            path='/add-idea'
            component={props => <AddIdeaPage {...props} />}          
             />
             
            <PrivateRoute
            exact
            path='/edit-idea-page'
            component={props => <EditIdeaPage {...props} editIdeaValues={this.state.editIdeaValues}/>}            
             />
  
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
