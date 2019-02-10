import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import AuthContext from '../context/auth-context';

const navbar = props => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="navbar">
          <div className="navbar__logo"> 
            <h1>MenuApp</h1>
          </div>
          <nav className="navbar__item">
            <ul>
              <li><NavLink to="/menu"> Menu </NavLink></li>
              {!context.token && <li>
                <NavLink to="/auth"> Sisään </NavLink>
               </li>}
              {context.token && <li>
                <button onClick={context.logout}> Ulos </button>
               </li>}
            </ul>
          </nav>
        </header>);
    }}
  </AuthContext.Consumer>
);

export default navbar;
