import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header'
import SearchBarPage from './components/SearchBarPage/SearchBarPage'
import LoginPage from './components/LoginPage/LoginPage'


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
          path='/login'
          component={LoginPage} />

          <Route
          exact
          path='/login'
          component={LoginPage} />


        </Switch>
      </main>
      


    </div>
  );
}

export default App;
