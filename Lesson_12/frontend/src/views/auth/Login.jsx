import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const Login = ({ setIsAuthenticated }) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()

   const validateForm = () => {
      const newErrors = {}

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(username)) {
         newErrors.username = 'Invalid email format.'
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(password)) {
         newErrors.password = 'Password must contain at least one letter, one number, one special and at least 8 characters.'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
   }

   const sendForm = async () => {
      if (!validateForm()) {
         return
      }

      try {
         const response = await apiServer.post('/auth/login', {
            username, password
         })
         localStorage.setItem('jwt_token', response.data.token)
         if (response.status === 200) {
            setIsAuthenticated(true)
            navigate('/cars')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error fetching data:', error)
      }
   }
   return (
      < div className="container" >
         <h1 className="title">Sign in</h1>
         <div className="form">
            <label className="form__label" htmlFor="username">Email:</label>
            <input className="form__input" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            {errors.username && <span className="error">{errors.username}</span>}
            <label className="form__label" htmlFor="password">Password:</label>
            <input className="form__input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className="error">{errors.password}</span>}
            <button className="form__button" onClick={sendForm}>Sign in</button>
         </div>
      </div >
   );
};

export default Login