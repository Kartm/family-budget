import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  useEffect(() => {
    console.log('hey')
    const testFunction = async () => {
      let API_SERVER = '';

  switch (process.env.NODE_ENV) {
      case 'development':
          API_SERVER = 'http://localhost:8000';
          break;
      case 'production':
          API_SERVER = process.env.REACT_APP_API_SERVER!;
          break;
      default:
          API_SERVER = 'http://localhost:8000';
          break;
  }

    const response = await fetch(`${API_SERVER}/test/`)
      console.log(response)
    }

    testFunction()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
