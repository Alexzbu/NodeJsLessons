import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './router/Routes'
import { jwtDecode } from 'jwt-decode'
import apiServer from './api/indexApi'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('jwt_token')
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true)
            setUsername(decoded.username)
            apiServer.defaults.headers.common['Authorization'] = `Bearer ${token}`
          } else {
            localStorage.removeItem('jwt_token')
            setIsAuthenticated(false)
            apiServer.defaults.headers.common['Authorization'] = `Bearer`
          }
        } catch (error) {
          console.error('Invalid token', error);
          localStorage.removeItem('jwt_token');
          setIsAuthenticated(false);
        }
      }
    }

    checkAuth()

  }, [isAuthenticated])

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} username={username} setIsAuthenticated={setIsAuthenticated} />
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  )
}

export default App
