import React, { Component } from 'react';
import './Auth.css';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.userRef = React.createRef();
        this.pwRef = React.createRef();
    }
    submitHandler = (event) => {
        event.preventDefault();
        const user = this.userRef.current.value;
        const pw = this.pwRef.current.value;

        if (user.trim().length === 0 || pw.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                query {
                    login(username: "${user}", password: "${pw}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
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
    };

    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="user">Käyttäjä</label>
                    <input type="text" id="user" ref={this.userRef} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Salasana</label>
                    <input type="password" id="password" ref={this.pwRef} />
                </div>
                <div className="form-control">
                    <button type="submit">Kirjaudu</button>
                </div>
            </form>);
    }
}

export default AuthPage;

