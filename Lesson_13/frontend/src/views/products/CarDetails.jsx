import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const CarDetail = () => {
   const { id = '' } = useParams()
   const [brand, setBrand] = useState('')
   const [year, setYear] = useState('')
   const [price, setPrice] = useState('')
   const [description, setDescription] = useState('')
   const [location, setLocation] = useState('')
   const [image, setImage] = useState(null)

   useEffect(() => {
      const fetchCar = async () => {
         if (id) {
            try {
               const response = await apiServer.get(`/cars/details/${id}`)
               setBrand(response.data.car.brand)
               setYear(response.data.car.year)
               setPrice(response.data.car.price)
               setDescription(response.data.car.description)
               setLocation(response.data.car.location.address)
               setImage(response.data.car.image)
            } catch (error) {
               console.error('Error fetching car data:', error)
            }
         }
      }
      fetchCar()
   }, [])
   return (
      <div className="container">
         <div className="car-card-deteils">
            <img src={image} alt={brand} className="car-card__image-deteils" />
            <h2 className="car-card__title">{brand} {year}</h2>
            <p className="car-card__number">Price: {price}</p>
            <p className="car-card__number">Description: {description}</p>
            <p className="car-card__number">Address: {location}</p>
         </div>
      </div>
   )
}

export default CarDetail