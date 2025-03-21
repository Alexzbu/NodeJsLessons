import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'
import { Link } from 'react-router-dom'

const Login = ({ setToken }) => {
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
         newErrors.password = 'Use 8 or more characters with a mix of letters, numbers & symbols'
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
            setToken(response.data.token)
            navigate('/catalog')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error fetching data:', error)
      }
   }
   return (
      <section className="section sign-in">
         <img className="sign-in__image" src="image/sign/image.jpg" alt="" />
         <div className="sign-in__container">
            <div className="sign-in__body">
               <h1 className="sign-in__title title">Sign In</h1>
               <Link href="#"
                  className="sign-in__button button button--border sign-in__button--google"
               ><span>Continue With Google</span>
               </Link>
               <Link href="#"
                  className="sign-in__button button button--border sign-in__button--apple"
               ><span>Continue With Apple</span>
               </Link>
               <p className="sign-in__or">OR</p>
               <div className="sign-in__form form">
                  <label className="form__label">Email address</label>
                  <div className="form__group form__group--sign-in">
                     <input
                        className="form__input form__input--sign-in"
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                     {errors.username && <span className="form__error">{errors.username}</span>}
                  </div>
                  <div className="form__pass-box">
                     <label className="form__label">Password</label>
                     <span className="_icon-eye-hide">Hide</span>
                  </div>
                  <div className="form__group">
                     <input
                        className="form__input"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     {errors.password && <span className="form__error">{errors.password}</span>}
                  </div>
                  <Link href="#" className="form__pass-recover">Forget your password</Link>
                  <button
                     className="form__button button form__button--sign-in"
                     onClick={sendForm}
                  >
                     Sign In
                  </button>
                  <p className="form__to-sign-up to-sign-up">Don’t have an account?
                     <Link to="/register" className="to-sign-up__link" >Sign up</Link>
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Login