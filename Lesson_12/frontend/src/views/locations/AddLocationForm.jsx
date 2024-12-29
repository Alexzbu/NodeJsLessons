import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddLocationForm = () => {
   const [title, setTitle] = useState('')
   const [address, setAddress] = useState('')
   const navigate = useNavigate()

   const sendForm = async () => {
      try {

         const response = await apiServer.post('/locations/add', {
            title, address,
         });

         if (response.status === 200) {
            navigate('/locations')
         }
      } catch (error) {
         console.error('Error adding car:', error)
      }
   };

   return (
      <div className="container">
         <h1 className="title">Add a new location</h1>
         <div className="form">
            <label className="form__label" htmlFor="title">The name of the location:</label>
            <input
               className="form__input"
               type="text"
               id="brand"
               name="brand"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form__label" htmlFor="description">Address:</label>
            <textarea
               className="form__textarea"
               id="description"
               name="description"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <button className="form__button" onClick={sendForm}>
               Add
            </button>
         </div>
      </div>
   );
};

export default AddLocationForm;
