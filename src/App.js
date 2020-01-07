import React, { useEffect } from 'react';
import './App.scss';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const userList = useSelector(state => state.users)
  //Update session storage after get list from store
  useEffect(() => {
    if(userList.length > 0){
      sessionStorage.setItem('userList', JSON.stringify(userList));
      console.log(userList);
    }
  }, [userList])

  return (
    <div className="App">
  {/*     <Login /> */}
      <SignUp />
    </div>
  );
}

export default App;
