import { Routes, Route } from 'react-router-dom'
import React from 'react';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
