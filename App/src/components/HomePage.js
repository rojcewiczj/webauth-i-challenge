import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from './axiosWithAuth'

const HomePage = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
      getData();
    }, []);
    const getData = () => {
     
      axiosWithAuth()

        .get('/users') 
        .then(res => 
          setUserList(res.data))
        .catch(error => console.log(error));
    }
    return (
      
      <div className="whole-page">
      
       {userList.map(user => (
           <p>{user.name}</p>
    ))}
     <h1>Hello</h1>
      </div>
      
    );
  };



export default HomePage;
