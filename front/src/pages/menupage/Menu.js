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

  componentDidMount() {
    this.setState({ isLoading: true});
    const requestBody = {
      query: `
      query {
        categories {
          name
          dishes {
            number
            name
            price
          }
        }
      }
      `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Ei onnistunut');
      }
      return res.json();
    }).then(json => {
      this.setState({ data: json, isLoading: false })    
    }).catch(error => {
      this.setState({error, isLoading: false});
    });
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

    return (
      <h1> Menu page!</h1>
    );
  }
}

export default MenuPage;

