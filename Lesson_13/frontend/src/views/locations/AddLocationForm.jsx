import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddLocationForm = () => {
   const { id = '' } = useParams()
   const [title, setTitle] = useState('')
   const [address, setAddress] = useState('')
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
      const getLocation = async () => {
         try {
            if (id) {
               const response = await apiServer.get(`/locations/${id}`)
               if (response.status === 200) {
                  setTitle(response.data.location.title)
                  setAddress(response.data.location.address)
               }
            }
         } catch (error) {
            console.error('Error:', error)
         }
      }
      getLocation()
   }, [])

   const validateForm = () => {
      const newErrors = {}

      if (!title.trim()) {
         newErrors.title = 'Name is required.'
      }
      if (title.length < 2 || title.length > 20) {
         newErrors.title = 'Name of the location should be from 2 to 20 characters.'
      }

      if (!address.trim()) {
         newErrors.address = 'Address is required.'
      }

      if (address.length < 3 || address.length > 50) {
         newErrors.address = 'Address must be from 3 to 50 characters'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
   }

   const sendForm = async () => {
      if (!validateForm()) {
         return
      }

      try {

         const response = await apiServer.post(`/locations/add/${id}`, {
            title, address,
         });

         if (response.status === 200) {
            navigate('/locations')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error adding car:', error)
      }
   };

   return (
      <div className="container">
         <h1 className="title">{id ? 'Update location' : 'Add a new location'}</h1>
         <div className="form">
            <label className="form__label" htmlFor="title">The name of the location:</label>
            <input
               className="form__input"
               type="text"
               id="title"
               name="title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className="error">{errors.title}</span>}


            <label className="form__label" htmlFor="address">Address:</label>
            <textarea
               className="form__textarea"
               id="address"
               name="address"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            {errors.address && <span className="error">{errors.address}</span>}

            <button className="form__button" onClick={sendForm}>
               {id ? 'Update' : 'Add'}
            </button>
         </div>
      </div>
   );
};

export default AddLocationForm;
