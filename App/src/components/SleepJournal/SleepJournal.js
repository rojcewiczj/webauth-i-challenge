import React, {useState, useEffect} from 'react';
import logo from "./img/Logo Black.png"
import axios from "axios";
import {Link, Route} from "react-router-dom";
import HomePage from "../HomePage";
import '../../App.css';
import styled from "styled-components";

const SleepJournalStyle = styled.div`
  padding: 10px;
  background-color: #282c34;
  min-height: 100vh;

  header{
    display: flex;
    /* width: 75%; */
    justify-content: space-between;
    margin-bottom: 15px;

    img{
      width: 15%
    }

    h1{
      margin-right: 40%
    }
  }

  a{
    /* margin-bottom: 45px; */
    margin-right: 85%;
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }

  main{
    padding: 20px 17%;
    margin-top: 25px;
    margin-left:30px;

    table{
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      border: 1px solid white;

      tr{
        border: 1px solid white;

        th, td{
          border: 1px solid white;
          width: 50%;
          height: 40px
        }
      }
    }
  }
`

function SleepJournal() {

  const [content, setContent] = useState([])

  function renderEmoji(emoji) {
    if(emoji === 7) {
      return '☹️'
    } else if(emoji === 8) {
      return '😐'
    } else if(emoji === 9) {
      return '🙂'
    } else if(emoji === 10) {
      return '😀'
    } else if(emoji === 11) {
      return '😊'
    } else if(emoji === 12) {
      return '😇'
    }
  }

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
    .then(response => {
      const dataFromApi = response.data.data;
      setContent(dataFromApi)
    })
    .catch(err => console.log(err))
  }, [])

  if (!content) return <h3>Loading, please wait...</h3>
  return (
    <SleepJournalStyle className="App">
      <header className="App-header">
        <img src={logo} alt='sleep-tracker-logo' />
      
        <h1>Sleep Journal</h1>
      </header>
      <Link to='/' >Return to homepage</Link>
    
      <main>
      <EmojiContent  content={content} renderEmoji={renderEmoji}/>
      </main>

      {<Route exact path="/" component={HomePage} />}
    </SleepJournalStyle>
  );
}

function EmojiContent (props) {
  const {content, renderEmoji} = props
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Average Mood For The Day</th>
          </tr>
          {content.map((element, indx) => 
            <tr key={indx}>
              <td>{element["first_name"]}</td>
              <td>{renderEmoji(element.id)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SleepJournal;
