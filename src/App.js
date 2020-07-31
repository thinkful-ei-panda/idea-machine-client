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
import EditIdeaForm from './components/EditIdeaForm/EditIdeaForm';


class App extends React.Component {
  state = {
    loggedInToggle:false,
    editIdeaValues: {
      title:null,
      content:null
    }
  }

  handleLogIn = () => {
    this.setState({loggedInToggle:true})
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
            render={props => <LoginPage {...props} handleLogIn={this.handleLogIn}/>}
            />            
  
            <PublicOnlyRoute
            exact
            path='/register'
            component={RegistrationPage} />

            <Route
  
            // <PrivateRoute
            exact
            path='/my-ideas'            
            // component={MyIdeasPage} />
            render = {props => <MyIdeasPage {...props} handleEditClick={this.handleEditClick}/> }
            />
  
            
            <Route
            // <PrivateRoute
            exact
            path='/add-idea'
            render={props => <AddIdeaPage {...props} />}
            // component={AddIdeaPage}
             />

             <Route
            // <PrivateRoute
            exact
            path='/edit-idea-page'
            render={props => <EditIdeaForm {...props} editIdeaValues={this.state.editIdeaValues}/>}
            // component={AddIdeaPage}
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
