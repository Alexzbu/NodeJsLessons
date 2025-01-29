import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'
import Loading from '../../components/Loading'

const Cart = ({ isAuthenticated, userId }) => {
   const [productList, setProductList] = useState([])
   const [page, setPage] = useState(0)
   const [filter, setFilter] = useState('')
   const [sort, setSort] = useState('')
   const [totalPages, setTotalPages] = useState(0)
   const [loading, setLoading] = useState(false)
   const [del, setDel] = useState(false)
   const navigate = useNavigate()
   const limit = 6

   useEffect(() => {
      const fetchData = async () => {
         try {
            // setLoading(true)
            // setDel(false)
            const response = await apiServer.get('/cart', {
               params: { userId }
            });
            console.log(response.data.productList)
            setProductList(response.data.productList)
            // setTotalPages(Math.ceil(response.data.count / limit) > 1 ? Math.ceil(response.data.count / limit) : 0)
            // setLoading(false)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData();
   }, [])

   const deleteItem = async (id) => {
      try {
         const response = await apiServer.delete(`/cars/${id}`)
         if (response.status === 200) {
            setDel(true)
         }
      } catch (error) {
         console.error('Error deleting data:', error)
      }
   }

   return (
      <main class="page">
         <div class="page__cart cart">
            <div class="cart__header header-cart">
               <div class="header-cart__container">
                  <ul class="header-cart__titels titles">
                     <li class="titles__item">Product Details</li>
                     <li class="titles__item">Price</li>
                     <li class="titles__item">Quantity</li>
                     <li class="titles__item">shipping</li>
                     <li class="titles__item">subtotal</li>
                     <li class="titles__item">action</li>
                  </ul>
               </div>
            </div>
            <div class="cart__body body-cart">
               <div class="body-cart__container">
                  <div class="body-cart__items">
                     {productList.map((item) => (
                        <div class="body-cart__item item">
                           <div class="item__details details">
                              <div class="details__image">
                                 <a href="#"><img src={item.product.image[0]} alt="" /></a>
                              </div>
                              <div class="details__content content-details">
                                 <h3 class="content-details__titel">{item.product.name}</h3>
                                 <h4 class="content-details__color">{item.product.color.name}</h4>
                                 <h4 class="content-details__size">{item.product.size.name}</h4>
                              </div>
                           </div>
                           <div class="item__price">${item.product.price}</div>
                           <div class="item__quantyty">
                              <button class="item__button item__button--minus">-</button>
                              <div class="item__count">{item.amount}</div>
                              <button class="item__button item__button--plus">+</button>
                           </div>
                           <div class="item__shipping">FREE</div>
                           <div class="item__subtotal">${item.amount * (item.product?.price)}</div>
                           <div class="item__trash">
                              <a href="#" class="item__link _icon-trash"></a>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div class="cart-footer">
                     <div class="cart-footer__content">
                        <span class="cart-footer__title-summe">Total:  </span>
                        <span class="cart-footer__summe">$518</span>
                     </div>
                     <button class="cart-footer__button button">Proceed To Checkout</button>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default Cart