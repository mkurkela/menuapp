import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Admin_nav.css';
import AdminContext from '../context/admin-context';

class admin_nav extends Component {
  static contextType = AdminContext;

  render () {
    return (
      <nav className="admin_nav__item">
        <ul>
          <li>
            <button onClick={this.context.set_show}>Lisää Ruoka</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Poista Ruoka</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Lisää Kategoria</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Poista Kategoria</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Lisää Käyttäjä</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Poista Käyttäjä</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default admin_nav;
