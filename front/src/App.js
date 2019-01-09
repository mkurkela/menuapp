import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import MenuPage from './pages/Menu';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/menu" exact />
                <Route menu="/menu" component={MenuPage} />
                <Route auth="/auth" component={AuthPage} />
                <Route admin="/admin" component={AdminPage} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
