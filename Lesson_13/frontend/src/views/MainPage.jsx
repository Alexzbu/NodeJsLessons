import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainSwiper from '../components/mainPage/MainSwiper'
import NewProductSwiper from '../components/mainPage/NewProductSwiper.jsx'
import Footer from '../components/Footer.jsx'

const MainPage = () => {

   return (
      <>
         <MainSwiper />
         <section class="page__shop-now shop-now">
            <div class="shop-now__container">
               <div class="shop-now__content">
                  <h2 class="shop-now__title">WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
                  <div class="shop-now__text">
                     <p>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                  </div>
                  <a href="#" class="shop-now__button button button--white">Shop Now</a>
               </div>
               <img class="shop-now__image" src="image/shop-now/01.jpg" alt="" />
            </div>
         </section>
         <NewProductSwiper />
      </>
   )
}

export default MainPage
