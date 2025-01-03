import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
   return (
      <div className="container">
         <section className="intro">
            <h1 className="intro__title">Welcome to the fleet!</h1>
            <p className="intro__text">We offer the best vehicles for your comfort and safety.</p>
            <Link to="/cars" className="intro__button">View the fleet</Link>
         </section>
      </div>
   )
}

export default MainPage
