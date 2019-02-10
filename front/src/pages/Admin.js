import React, { Component } from 'react';

import AdminNav from '../components/Admin_nav';
import Backdrop from '../components/Backdrop';
import Modal from '../components/Modal';
import AdminContext from '../context/admin-context';

class AdminPage extends Component {
    state = {
      show: null
    };

    set_show = (value) => {
      this.setState({show: 'add_dish'});
    }

    addDishHandler = () => {
      console.log("HEre we should add");
      this.setState({show: null});
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
              <Modal title="Lisää ruoka" onBack={this.clear_show} onAdd={this.addDishHandler}>
                <p> Lisää ruoka Modaali </p>
              </Modal>}
            </AdminContext.Provider>
          </React.Fragment>
        );
    }
}

export default AdminPage;
