import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import MenuPage from './pages/menupage/Menu';
import Navbar from './components/Navbar.js';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navbar />
                <main className="main-content">
                    <Switch>
                        <Redirect from="/" to="/menu" exact />
                        <Route path="/auth" component={AuthPage} />
                        <Route path="/menu" component={MenuPage} />
                        <Route path="/admin" component={AdminPage} />
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default App;
