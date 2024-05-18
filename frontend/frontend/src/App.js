// import logo from './logo.svg';
import React from 'react';
import './App.css';
// import Signup from '../Homepage/Signup.jsx'  
import Main from './Homepage/Main.jsx' 
import Login from './Homepage/Login.jsx';
import Signup from './Homepage/Signup.jsx';
//import Content from './Homepage/Content.jsx';
import Dashboard from "./Mailpage/Dashboard.jsx";
import Compose from './Mailpage/Compose.jsx';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}></Route>
          <Route path='/signup' exact element={<Signup/>}></Route>
          <Route path='/' exact element={<Main/>}></Route>
          <Route path="/Dashbaord" exact element={<Dashboard />}></Route>
          <Route path='/Compose' exact element={<Compose/>}></Route>
        </Routes>
      </Router>
     
    </div>

  );
}

export default App;
