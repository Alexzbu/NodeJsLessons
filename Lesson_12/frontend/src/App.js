import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './router/Routes'

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  )
}

export default App
