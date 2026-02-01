import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Portfolio from './components/Portfolio.jsx'
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/admin/Login';
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
