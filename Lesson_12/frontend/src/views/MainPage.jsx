import React from 'react'

const MainPage = () => {
   return (
      <div className="container">
         <section className="intro">
            <h1 className="intro__title">Welcome to the fleet!</h1>
            <p className="intro__text">We offer the best vehicles for your comfort and safety.</p>
            <a href="/cars" className="intro__button">View the fleet</a>
         </section>
      </div>
   )
}

export default MainPage
