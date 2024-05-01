import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/login/1`)
    .then(res => console.log(res.data))
    .catch(error => console.error('Error fetching user:', error));
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/`)
    .then(res => console.log(res.data))
    .catch(error => console.error('Error fetching user:', error));
  }, [])


  return (
    <div className="App">
     
    </div>
  );
}

export default App;
