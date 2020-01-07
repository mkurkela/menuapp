import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css';

class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  fetchMenu() {
    this.setState({ isLoading: true});
    const requestBody = {
      query: `
      query {
        categories {
          _id
          name
          dishes {
            _id
            number
            name
            price
          }
        }
      }
      `
    };

    fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/graphql`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Ei onnistunut');
      }
      return res.json();
    }).then(json => {
      const menu = json.data;
      this.setState({ data: menu, isLoading: false })    
    }).catch(error => {
      this.setState({error, isLoading: false});
    });

  }
  componentDidMount() {
    this.fetchMenu();
  }

  const 
  render() {
    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Lataa menua...</p>;
    }

    if (null === data)
      return <p> Odotetaan menua...</p>;

    console.log(data);
    const menu = data.categories.map(item => {
      return <li key={item._id} className="menu__list-item">{item.name}</li>;
    });

    return (
      <React.Fragment>
      <ul className="menu__list">{menu}</ul>
      </React.Fragment>
    );
  }
}

export default MenuPage;

