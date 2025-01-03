import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const Register = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [passwordConfirm, setPasswordConfirm] = useState('')
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

      if (passwordConfirm !== password) {
         newErrors.passwordConfirm = 'Passwords do not match'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
   }

   const sendForm = async () => {
      if (!validateForm()) {
         return
      }
      try {
         const response = await apiServer.post('/auth/signup', {
            username, password
         })
         if (response.status === 200) {
            navigate('/login')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error fetching data:', error)
      }
   }
   return (
      <div className="container">
         <h1 className="title">Registration</h1>
         <div className="form">
            <label className="form__label" htmlFor="username">Email:</label>
            <input
               className="form__input"
               type="text" name="username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <span className="error">{errors.username}</span>}

            <label className="form__label" htmlFor="password" >Password:</label>
            <input
               className="form__input"
               type="password" name="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <label className="form__label" htmlFor="password" >Confirm password:</label>
            <input
               className="form__input"
               type="password"
               name="passwordConfirm"
               value={passwordConfirm}
               onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}

            <button className="form__button" onClick={sendForm}>Sign up</button>
         </div>
      </div>
   );
};

export default Register