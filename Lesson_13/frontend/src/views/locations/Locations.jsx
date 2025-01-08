import React, { useState, useEffect } from 'react'
import apiServer from '../../api/indexApi'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const Locations = ({ isAuthenticated }) => {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true)
            const response = await apiServer.get('/locations')
            setData(response.data)
            setLoading(false)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData();
   }, [])

   const deleteItem = async (id) => {
      try {
         const response = await apiServer.delete(`/locations/${id}`)
         if (response.status === 200) {
            window.location.reload()
         }
      } catch (error) {
         console.error('Error deleting data:', error)
      }
   }

   return (
      <div className="container">
         <h1 className="title">Locations</h1>
         <div className="car-list">
            {loading &&
               <Loading />
            }
            {data.map((item) => (

               <div className="car-card" key={item._id}>
                  <h2 className="car-card__title">{item.title}</h2>
                  <p className="car-card__number">Address: {item.address}</p>
                  {isAuthenticated && (
                     <div className="car-card__actions">
                        <button className="car-card__link delete-button" onClick={() => deleteItem(item._id)}>Remove</button>
                        <button className="car-card__link" onClick={() => navigate(`/addLocation/${item._id}`)}>Edit</button>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   )
}

export default Locations