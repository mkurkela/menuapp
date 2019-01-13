import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const navbar = props => (
    <header className="navbar">
        <div className="navbar__logo"> 
            <h1>MenuApp</h1>
        </div>
        <nav className="navbar__item">
            <ul>
                <li><NavLink to="/menu"> Menu </NavLink></li>
                <li><NavLink to="/auth"> Kirjaudu </NavLink></li>
            </ul>
        </nav>
    </header>
)

export default navbar;
