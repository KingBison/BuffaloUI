import './App.css';
import React, { useEffect, useState } from 'react';
import {fetchUrl, activateServerManager} from "./serverUtil"
import Login from './components/Login';
import Game from './components/Game';
 

function App() {

  const [serverData, setServerData] = useState(false);
  const [loggedIn, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState(false)

  useEffect(() => {
    if (sessionStorage.name) {
      setName(sessionStorage.name)
      setLogin(true)
    }
    fetchUrl(setUrl)
  }, [])

  useEffect(() => {
    activateServerManager(url, setServerData)
  }, [url])

  const getBody = () => {
      if (!loggedIn){
        return(<Login 
                  url={url} 
                  setName={setName} 
                  setLogin={setLogin}
                />)
      } else {
        return (<Game  
                  url={url}
                  name={name}
                  serverData={serverData}
                  setLogin={setLogin}
                  setServerData={setServerData}
                />)
      }
  }



  return (
    <>
      {getBody()}
    </>
  );
}

export default App;
