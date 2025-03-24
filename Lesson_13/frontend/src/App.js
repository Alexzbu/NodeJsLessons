import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import AppRoutes from './router/Routes'
import Footer from './components/Footer'
import { jwtDecode } from 'jwt-decode'
import apiServer from './api/indexApi'
import ScrollToTop from './components/ScrollToTop'
import MyToaster from './components/Toaster'
import { slideToggle } from './utils/spollers/slideToggle.mjs'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('jwt_token'))
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [productList, setProductList] = useState([])
  const [add, setAdd] = useState(false)
  const [del, setDel] = useState(false)

  useEffect(() => {
    slideToggle()
    const checkAuth = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setUser(
              {
                id: decoded.id,
                name: decoded.username,
                role: decoded.role
              }
            )
            apiServer.defaults.headers.common['Authorization'] = `Bearer ${token}`
          } else {
            localStorage.removeItem('jwt_token')
            apiServer.defaults.headers.common['Authorization'] = `Bearer`
          }
        } catch (error) {
          console.error('Invalid token', error);
          localStorage.removeItem('jwt_token');
        }
      } else {
        setUser(null)
      }
    }

    checkAuth()

  }, [token])

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await apiServer.get('/cart', {
            params: { userId: user.id }
          })
          setProductList(response.data.productList)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [user, add, del])

  return (
    <Router basename="/">
      <ScrollToTop />
      <MyToaster />
      <Header
        user={user}
        setToken={setToken}
        setSearch={setSearch}
        productList={productList}
      />
      <AppRoutes
        user={user}
        setToken={setToken}
        search={search}
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
