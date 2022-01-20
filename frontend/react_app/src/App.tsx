import React, { useEffect } from 'react';
import Urls from "./Urls";

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
      <Urls/>
    </div>
  );
}

export default App;
