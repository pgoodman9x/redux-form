import React, { useEffect } from 'react';
import './App.scss';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useSelector } from 'react-redux'
import SplitPane from './components/SplitPane';
import ControlPanel from './components/ControlPanel';
import UserList from './components/UserList';


function App() {
  const userList = useSelector(state => state.users);
  const tempUser = JSON.parse(sessionStorage.getItem('tempUser'));

  //Update session storage after get list from store
   useEffect(() => {
    if(userList.length > 0){
      sessionStorage.setItem('userList', JSON.stringify(userList));
      console.log(userList);
    }
  }, [userList])

  return (
    <div className="App">
      <SplitPane 
        left={tempUser !== null && tempUser.isLogin ? <ControlPanel /> :  <Login />} 
        right={tempUser !== null && tempUser.isLogin ? <UserList /> : <SignUp /> }
       />
    </div>
  );
}

export default App;
