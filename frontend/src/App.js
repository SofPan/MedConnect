import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});

  //This part doesn't work/////
  useEffect(() => {
    axios.get(`http://localhost:8080/`)
      .then(res => {
        console.log(res.data)
        setUser(res.data);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []); 
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
