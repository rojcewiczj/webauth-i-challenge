import React, { useState, useEffect } from "react";
import axios from "axios";


const HomePage = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
      getData();
    }, []);
    const getData = () => {
    axios
        .get('http://localhost:8000/api/users')
        .then(res => setUserList(res.data))
        .catch(error => console.log(error));
    }
    return (
      
      <div className="whole-page">
     
      {userList.map(user => (
          <p>{user.name}</p>
    ))}
     
      </div>
      
    );
  };



export default HomePage;
