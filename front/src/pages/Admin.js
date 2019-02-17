import React, { Component } from 'react';

import AdminNav from '../components/Admin_nav';
import Backdrop from '../components/Backdrop';
import Modal from '../components/Modal';
import AdminContext from '../context/admin-context';
import AuthContext from '../context/auth-context';

class AdminPage extends Component {
  state = {
    show: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.dishNameRef = React.createRef();
    this.dishNumberRef = React.createRef();
    this.dishPriceRef = React.createRef();
    this.dishCategoryRef = React.createRef();

  }

  validateName = (name) => {
    if (0 === name.trim().length)
      return false;

    return true;
  }

  validatePrice = (price) => {
    if (0 >= price)
      return false;

    return true;
  }

  validateNumber = (number) => {
    if (0 >= number)
      return false;

    return true;
  }

  validateCategory = (category) => {
    if (0 === category.trim().length)
      return false;

    return true;
  }

  set_show = (value) => {
    this.setState({show: 'add_dish'});
  }

  addDish = (dishName, dishNumber, dishPrice) => {
    const requestBody = {
      query: `
        mutation {
          createDish(dishInput: {name: "${dishName}", number: ${dishNumber}, price: ${dishPrice} }) {
            name,
            number,
            price,
            belongs {
              name
            }
          }
        }
      `
    };

    const token = this.context.token;
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Ei onnistunut');
      }
      return res.json();
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);  
    });

  }
    addDishHandler = () => {
      this.setState({show: null});
      const dishName = this.dishNameRef.current.value;
      const dishNumber= +this.dishNumberRef.current.value;
      const dishPrice = +this.dishPriceRef.current.value;
      const dishCategory = this.dishCategoryRef.current.value;

      if (! this.validateName(dishName) ||
        ! this.validateNumber(dishNumber) ||
        ! this.validatePrice(dishPrice) || 
        ! this.validateCategory(dishCategory)) {
        return;
      }
      this.addDish(dishName, dishNumber, dishPrice, dishCategory);
    }

    clear_show = () => {
      this.setState({show: null});
    }


    render() {
        return (
          <React.Fragment>
            <AdminContext.Provider value={{show: this.show,
                                           set_show: this.set_show}}>
              <AdminNav />
              {this.state.show && <Backdrop />}
              {this.state.show === 'add_dish' &&
              <Modal title="Lisää ruoka"
                onBack={this.clear_show}
                onAdd={this.addDishHandler}>
                <div className="form-control">
                  <label htmlFor="d_name">Nimi</label>  
                  <input type="text" id="d_name" ref={this.dishNameRef}></input>
                </div>
                <div className="form-control">
                  <label htmlFor="d_number">Numero</label>  
                  <input type="number" id="d_number" ref={this.dishNumberRef}></input>  
                </div>
                <div className="form-control">
                  <label htmlFor="d_price">Hinta</label>  
                  <input type="number" id="d_price" ref={this.dishPriceRef}></input>  
                </div>
                <div className="form-control">
                  <label htmlFor="d_category">Kategoria</label>  
                  <input type="text" id="d_category" ref={this.dishCategoryRef}></input>  
                </div>
              </Modal>}
            </AdminContext.Provider>
          </React.Fragment>
        );
    }
}

export default AdminPage;
