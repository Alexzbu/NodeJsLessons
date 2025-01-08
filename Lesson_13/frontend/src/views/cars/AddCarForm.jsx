import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddCarForm = () => {
   const { id = '' } = useParams()
   const [brand, setBrand] = useState('')
   const [year, setYear] = useState('')
   const [price, setPrice] = useState('')
   const [description, setDescription] = useState('')
   const [locations, setLocations] = useState([])
   const [location, setLocation] = useState('')
   const [image, setImage] = useState(null)
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()

   useEffect(() => {
      const fetchCar = async () => {
         if (id) {
            try {
               const response = await apiServer.get(`/cars/details/${id}`)
               setBrand(response.data.car.brand)
               setYear(response.data.car.year)
               setPrice(response.data.car.price)
               setDescription(response.data.car.description)
               setLocation(response.data.car.location?._id)
            } catch (error) {
               console.error('Error fetching car data:', error)
            }
         }
      }
      const fetchLocations = async () => {
         try {
            const response = await apiServer.get('/locations')
            setLocations(response.data)
            setLocation(response.data[0]._id)
         } catch (error) {
            console.error('Error fetching locations:', error)
         }
      }
      fetchCar()
      fetchLocations()
   }, [])

   const validateForm = () => {
      const newErrors = {}

      if (!brand.trim()) {
         newErrors.brand = 'Brand is required.'
      }
      if (brand.length > 30) {
         newErrors.brand = 'Brand must be at most 30 characters long.'
      }

      if (!year || year < 1886 || year > new Date().getFullYear()) {
         newErrors.year = 'Please enter a valid year.'
      }

      if (!price || price <= 0) {
         newErrors.price = 'Price must be greater than 0.'
      }

      if (!description.trim()) {
         newErrors.description = 'Description is required.'
      }

      if (!image && !id) { // Image is required only for adding a new car
         newErrors.image = 'Image is required.'
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0
   }


   const sendForm = async () => {
      if (!validateForm()) {
         return
      }

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

         const response = await apiServer.post(`/cars/add/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         if (response.status === 200) {
            navigate('/cars')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error adding car:', error)
      }
   };

   return (
      <div className="container">
         <h1 className="title">{id ? 'Update the car' : 'Add a new car'}</h1>
         <div className="form">
            <label className="form__label" htmlFor="brand">Brand:</label>
            <input
               className="form__input"
               type="text"
               id="brand"
               name="brand"
               value={brand}
               onChange={(e) => setBrand(e.target.value)}
            />
            {errors.brand && <span className="error">{errors.brand}</span>}

            <label className="form__label" htmlFor="year">Year of release:</label>
            <input
               className="form__input"
               type="number"
               id="year"
               name="year"
               value={year}
               onChange={(e) => setYear(e.target.value)}
            />
            {errors.year && <span className="error">{errors.year}</span>}

            <label className="form__label" htmlFor="price">Price:</label>
            <input
               className="form__input"
               type="number"
               id="price"
               name="price"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <span className="error">{errors.price}</span>}

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
               <select value={location} name="location" id="location" className="form__select" onChange={(e) => setLocation(e.target.value)}>
                  {locations.map((item) => (
                     <option value={item._id} key={item._id} >{item.title}</option>
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
            {errors.image && <span className="error">{errors.image}</span>}

            <button className="form__button" onClick={sendForm}>
               {id ? 'Update' : 'Add'}
            </button>
         </div>
      </div >
   );
};

export default AddCarForm;
