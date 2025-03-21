import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'
import Loading from '../../components/Loading'

const Cars = ({ isAuthenticated }) => {
   const [data, setData] = useState([])
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
            setLoading(true)
            setDel(false)
            const response = await apiServer.get('/cars', {
               params: { page, limit, sort, filter },
            });
            setData(response.data.carList)
            setTotalPages(Math.ceil(response.data.count / limit) > 1 ? Math.ceil(response.data.count / limit) : 0)
            setLoading(false)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData();
   }, [page, sort, filter, del])

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
      <div className="container">
         <h1 className="title">List of fleet cars</h1>
         <div className='filter-block'>
            <div className="form">
               <input
                  className="form__input"
                  type="text"
                  placeholder="Filter by brand"
                  value={filter}
                  onChange={(e) => { setFilter(e.target.value); setPage(0) }}
               />
               <div className="form__select-wrapper">
                  <select className="form__select" onChange={(e) => { setSort(e.target.value); setPage(0) }}>
                     <option value="">Sort by price:</option>
                     <option value="price:asc">Price: Low to high</option>
                     <option value="price:desc">Price: High to low</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="car-list">
            {loading &&
               <Loading />
            }
            {data.map((item) => (

               <div className="car-card" key={item._id}>
                  <Link to={`/carDetail/${item._id}`}>
                     <img className="car-card__image" src={item.image} alt={item.brand} />
                  </Link>
                  <h2 className="car-card__title">{item.brand} {item.year}</h2>
                  <p className="car-card__number">Price (hour): {item.price}$</p>
                  <p className="car-card__number">Location: {item.location?.title}</p>
                  {isAuthenticated && (
                     <div className="car-card__actions">
                        <button className="car-card__link delete-button" onClick={() => deleteItem(item._id)}>Remove</button>
                        <button className="car-card__link" onClick={() => navigate(`/addCar/${item._id}`)}>Edit</button>
                     </div>
                  )}
               </div>
            ))}
         </div>
         <div className='pagination-block'>
            {Array.from({ length: totalPages }, (_, index) => (
               <button className={page === index ? 'car-card__link active-button' : 'car-card__link'}
                  key={index}
                  onClick={() => setPage(index)}
                  disabled={page === index}
               >
                  {index + 1}
               </button>
            ))}
         </div>
      </div>
   )
}

export default Cars