import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Public from './Routes/Public';
import Menu from './Components/Menu';
function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Public/>
    </BrowserRouter>
  );
}

export default App;
