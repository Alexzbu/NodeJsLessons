import React, { useState, useEffect } from 'react';
import apiServer from '../../api/indexApi';

const Locations = () => {
   const [data, setData] = useState([])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiServer.get('/locations')
            setData(response.data)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData();
   }, [])

   return (
      <div className="container">
         <h1 className="title">List of fleet cars</h1>
         <div className="car-list">
            {data.map((item) => (

               <div className="car-card" key={item._id}>
                  <h2 className="car-card__title">{item.title}</h2>
                  <p className="car-card__number">Address: {item.address}</p>
                  <div className="car-card__actions">
                     <button className="car-card__link delete-button">Remove</button>
                     <button className="car-card__link">Edit</button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Locations