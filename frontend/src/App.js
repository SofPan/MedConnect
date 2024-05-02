import './App.css';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';

import MapComponent from './components/MapComponent';
import ClinicList from './components/ClinicsList/ClinicsList'
export const UserSignedIn = createContext();


function App() {

  const [user, setUser] = useState(false);



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
        setUser(res.data);
      })
      .catch(error => console.error('Error fetching user:', error));
  }

  return (
    <div className="App">

      <UserSignedIn.Provider value={{ user, setUser }}>
        <NavBar />
      </UserSignedIn.Provider>

      <button onClick={handleLogin}>Login</button>

      {/* <ClinicList /> */}
      <MapComponent />
    </div>
  );
}

export default App;
