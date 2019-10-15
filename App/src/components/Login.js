import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import Register from './Registration';
import axiosWithAuth from './axiosWithAuth'

import '../Login.css'
class Login extends React.Component {
    state = {
        loading: false,
      users: {
        // email: '',
        username: '',
        password: ''
      }
    };
  
    handleChange = e => {
      this.setState({
        users: {
          ...this.state.users,
          [e.target.name]: e.target.value
        }
      });
    };
  
    login = e => {
      e.preventDefault();
      this.setState({ loading: true });
      
      axiosWithAuth()
        .post('login'
          , this.state.users)
        .then(res => {
        console.log(res.data)
          this.props.history.push('/protected');
          this.setState({ loading: false });
        })
        .catch(err => console.log(err));
    };
    
  
    render() {
      return (
        <div className="login-container">
        <div className="login-form">
        
          <div className="login-card">
            <div>💤</div>
          <form onSubmit={this.login}>
          <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.users.username}
              onChange={this.handleChange}
            />
            {/* <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            /> */}
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.users.password}
              onChange={this.handleChange}
            />
          <button>Log in</button>
          </form>
          <Register/>
          <div>💤</div>
          </div>
        </div>
        </div>
      
      );
    }
  }
  
  export default Login;