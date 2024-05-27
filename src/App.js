
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup/signup';
import Signin from './pages/signin/signin';
import AddTask from './pages/addTask/addTask';
import GetTask from './pages/getTask/getTask';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/AddTask" element={<AddTask/>} />
        <Route path="/GetTask" element={<GetTask/>} />
      </Routes>
    </Router>
  );
}

export default App;

