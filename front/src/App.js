import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import AdminPage from './pages/Admin';
import MenuPage from './pages/menupage/Menu';
import Navbar from './components/Navbar.js';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({token: token, userId: userId });
  };

  logout = () => {
    this.setState({token: null, userId: null})
  };
  render() {
    return (
        <BrowserRouter>
            <React.Fragment>
              <AuthContext.Provider value={{token: this.state.token,
                                            userId: this.state.userId,
                                            login: this.login,
                                            logout: this.logout}}>
                <Navbar />
                <main className="main-content">
                    <Switch>
                        <Redirect from="/" to="/menu" exact />
                        {!this.state.token && <Redirect from="/admin" to="/auth" exact />}
                        {this.state.token && <Redirect from="/auth" to="/menu" exact />}
                        {!this.state.token && <Route path="/auth" component={AuthPage} />}
                        <Route path="/menu" component={MenuPage} />
                        {this.state.token && <Route path="/admin" component={AdminPage} />}
                    </Switch>
                </main>
              </AuthContext.Provider>
            </React.Fragment>
        </BrowserRouter>
    );
  }
}

export default App;
