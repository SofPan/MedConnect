import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      fetchData();
  }, [])
  console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
