import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';

import './App.css';



function App() {
const [sessionList, setSessionList] = useState([])


  return (
    
    <Router>
    <div className="App">
      <div className ="header">
      <ul>
          <li>
              <Link to="/login" style={{ textDecoration: 'none'}}>Login</Link>
          </li>
        
        </ul>
      </div>
      <Switch>
          <PrivateRoute exact path="/protected" component={HomePage} />
          <Route exact path="/login" component={Login} />
         
           
        </Switch>

    </div>
    </Router>
    
  );
}

export default App;
