import './App.css';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import useApplicationData from './hooks/useApplicationData';
import UserProfile from './components/UserProfile/UserProfile';

export const UserSignedIn = createContext();


function App() {

  // const { userState, dispatch } = useApplicationData();



  //This part doesn't work/////
  // useEffect(() => {
  //   axios.get(`http://localhost:8080/`)
  //     .then(res => {
  //       console.log(res.data)
  //       setUser(res.data);
  //     })
  //     .catch(error => console.error('Error fetching user:', error));
  // }, []); 
  //////////////////
  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/login/1`)
      .then(res => {
        console.log("Login", res.data)
        // dispatch(res.data);
      })
      .catch(error => console.error('Error fetching user:', error));
  }

  return (
    <div className="App">

      {/* <UserSignedIn.Provider value={{ user, setUser }}>
        <NavBar />
      </UserSignedIn.Provider> */}
      <button onClick={handleLogin}>Login</button>

      <UserProfile />
    </div>
  );
}

export default App;
