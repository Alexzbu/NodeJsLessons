import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './router/Routes'
import Footer from './components/Footer'
import { jwtDecode } from 'jwt-decode'
import apiServer from './api/indexApi'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [productList, setProductList] = useState([])
  const [add, setAdd] = useState(false)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('jwt_token')
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true)
            setUsername(decoded.username)
            setUserId(decoded.id)
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

  }, [])

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await apiServer.get('/cart', {
            params: { userId }
          });
          setProductList(response.data.productList)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [userId, add, del])

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        username={username}
        setIsAuthenticated={setIsAuthenticated}
        productList={productList}
      />
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userId={userId}
        productList={productList}
        setProductList={setProductList}
        setAdd={setAdd}
        setDel={setDel}
      />
      <Footer />
    </Router>
  )
}

export default App
