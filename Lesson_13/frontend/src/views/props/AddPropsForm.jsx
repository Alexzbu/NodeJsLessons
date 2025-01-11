import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddPropsForm = () => {
   const { id = '' } = useParams()
   const { title = '' } = useParams()
   const { upName = '' } = useParams()
   const [name, setName] = useState('')
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()

   const validateForm = () => {
      const newErrors = {}

      if (!name.trim()) {
         newErrors.name = 'Name is required.'
      }
      if (name.length < 2 || name.length > 20) {
         newErrors.name = 'Name of the props should be from 2 to 20 characters.'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
   }

   const sendForm = async () => {
      // if (!validateForm()) {
      //    return
      // }

      try {
         console.log(title)
         const response = await apiServer.post(`/props/${title}/add/${id}`, {
            name
         });

         if (response.status === 200) {
            navigate('/addProduct')
         }
      } catch (error) {
         // setErrors(error.response.data)
         console.error('Error adding car:', error)
      }
   };

   return (
      <main class="add-props">
         <div class="add-props__container">
            <h1 class="add-props__title title">Add new props</h1>
            <div class="form">

               <label class="form__label">Name:</label>
               <input
                  class="form__input"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />

               <button class="form__button button" onClick={sendForm}>
                  Add
               </button>
            </div>
         </div>
      </main>
   );
};

export default AddPropsForm;
