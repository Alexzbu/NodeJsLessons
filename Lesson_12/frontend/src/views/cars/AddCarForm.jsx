import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddCarForm = () => {
   const [brand, setBrand] = useState('')
   const [year, setYear] = useState('')
   const [price, setPrice] = useState('')
   const [description, setDescription] = useState('')
   const [locations, setLocations] = useState([])
   const [location, setLocation] = useState('')
   const [image, setImage] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiServer.get('/locations')
            setLocations(response.data)
            setLocation(response.data[0]._id)
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData();
   }, [])

   const sendForm = async () => {


      try {
         const formData = new FormData();
         formData.append('brand', brand);
         formData.append('year', year);
         formData.append('price', price);
         formData.append('description', description);
         formData.append('location', location);
         if (image) {
            formData.append('carImage', image);
         }

         const response = await apiServer.post('/cars/add', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         if (response.status === 200) {
            navigate('/cars')
         }
      } catch (error) {
         console.error('Error adding car:', error)
      }
   };

   return (
      <div className="container">
         <h1 className="title">Додати новий автомобіль</h1>
         <div className="form">
            <label className="form__label" htmlFor="brand">Mark:</label>
            <input
               className="form__input"
               type="text"
               id="brand"
               name="brand"
               value={brand}
               onChange={(e) => setBrand(e.target.value)}
            />

            <label className="form__label" htmlFor="year">Year of release:</label>
            <input
               className="form__input"
               type="number"
               id="year"
               name="year"
               value={year}
               onChange={(e) => setYear(e.target.value)}
            />

            <label className="form__label" htmlFor="price">Price:</label>
            <input
               className="form__input"
               type="number"
               id="price"
               name="price"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
            />

            <label className="form__label" htmlFor="description">Description:</label>
            <textarea
               className="form__textarea"
               id="description"
               name="description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label className="form__label" htmlFor="location">Location:</label>
            <div className="form__select-wrapper">
               <select name="location" id="location" className="form__select" onChange={(e) => setLocation(e.target.value)}>
                  {locations.map((item) => (
                     <option value={item._id} key={item._id}>{item.title}</option>
                  ))}
               </select>
            </div>


            <label className="form__label" htmlFor="carImage">Image:</label>
            <input
               className="form__input"
               type="file"
               id="carImage"
               name="carImage"
               onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="form__button" onClick={sendForm}>
               Add
            </button>
         </div>
      </div >
   );
};

export default AddCarForm;
