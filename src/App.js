import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header'
import SearchBarPage from './components/SearchBarPage/SearchBarPage'
import LoginPage from './components/LoginForm/LoginForm'
import MyIdeasPage from './components/MyIdeasPage/MyIdeasPage';
import TrackedIdeasPage from './components/TrackedIdeasPage/TrackedIdeasPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';


function App() {
  
  return (
    <div className="App">
      <header className='App__header'>
        <Header />
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
          component={LoginPage} />

          <Route
          exact
          path='/register'
          component={RegistrationPage} />

          <Route
          exact
          path='/my-ideas'
          component={MyIdeasPage} />

          <Route
          exact
          path='/tracked-ideas'
          component={TrackedIdeasPage} />

        </Switch>
      </main>
    </div>
  );
}

export default App;
