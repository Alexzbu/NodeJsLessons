import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiServer from '../../api/indexApi'

const AddProductForm = () => {
   const { id = '' } = useParams()
   const [brand, setBrand] = useState('')
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [description, setDescription] = useState('')
   const [sex, setSex] = useState([])
   const [sexUP, setSexUP] = useState('')
   const [categorys, setCategorys] = useState([])
   const [category, setCategory] = useState('')
   const [image, setImage] = useState(null)
   const [errors, setErrors] = useState({})
   const navigate = useNavigate()

   // useEffect(() => {
   //    const fetchCar = async () => {
   //       if (id) {
   //          try {
   //             const response = await apiServer.get(`/cars/details/${id}`)
   //             setBrand(response.data.car.brand)
   //             setYear(response.data.car.year)
   //             setPrice(response.data.car.price)
   //             setDescription(response.data.car.description)
   //             setLocation(response.data.car.location?._id)
   //          } catch (error) {
   //             console.error('Error fetching car data:', error)
   //          }
   //       }
   //    }
   //    const fetchLocations = async () => {
   //       try {
   //          const response = await apiServer.get('/locations')
   //          setLocations(response.data)
   //          setLocation(response.data[0]._id)
   //       } catch (error) {
   //          console.error('Error fetching locations:', error)
   //       }
   //    }
   //    fetchCar()
   //    fetchLocations()
   // }, [])

   // const validateForm = () => {
   //    const newErrors = {}

   //    if (!brand.trim()) {
   //       newErrors.brand = 'Brand is required.'
   //    }
   //    if (brand.length > 30) {
   //       newErrors.brand = 'Brand must be at most 30 characters long.'
   //    }

   //    if (!year || year < 1886 || year > new Date().getFullYear()) {
   //       newErrors.year = 'Please enter a valid year.'
   //    }

   //    if (!price || price <= 0) {
   //       newErrors.price = 'Price must be greater than 0.'
   //    }

   //    if (!description.trim()) {
   //       newErrors.description = 'Description is required.'
   //    }

   //    if (!image && !id) { // Image is required only for adding a new car
   //       newErrors.image = 'Image is required.'
   //    }

   //    setErrors(newErrors)

   //    return Object.keys(newErrors).length === 0
   // }


   const sendForm = async () => {
      // if (!validateForm()) {
      //    return
      // }

      try {
         const formData = new FormData();
         formData.append('brand', brand);
         formData.append('name', name);
         formData.append('price', price);
         formData.append('description', description);
         formData.append('category', category);
         if (image) {
            formData.append('productImage', image);
         }

         const response = await apiServer.post(`/product/add/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         if (response.status === 200) {
            navigate('/catalog')
         }
      } catch (error) {
         setErrors(error.response.data)
         console.error('Error adding product:', error)
      }
   };

   return (
      <main className="add-product">
         <div className="add-product__container">
            <h1 className="add-product__title title">Add new product</h1>
            <div className="form">

               <label className="form__label">Name:</label>
               <input className="form__input"
                  type="text"
                  id="name"
                  name="name"
               />

               <label className="form__label">Price:</label>
               <input className="form__input" type="number" id="price" name="price" />

               <label className="form__label">Description:</label>
               <textarea className="form__textarea" id="description" name="description"></textarea>

               <label className="form__label">Brand:</label>
               <div className="form__select-wrapper">
                  <div className="form__select-item">
                     <select name="brand" id="brand" className="form__select">
                        <option></option>
                     </select>
                  </div>
                  <Link className="form__link menu__link" to="/props/?title=brand">Edit</Link>
               </div>

               <label className="form__label">Sex:</label>
               <div className="form__select-wrapper">
                  <div className="form__select-item">
                     <select name="sex" id="sex" className="form__select">
                        <option></option>
                     </select>
                  </div>
                  <Link className="form__link menu__link" to="/props/?title=sex">Edit</Link>
               </div>

               <label className="form__label">Color:</label>
               <div className="form__select-wrapper">
                  <div className="form__select-item">
                     <select name="color" id="color" className="form__select">
                        <option></option>
                     </select>
                  </div>
                  <Link className="form__link menu__link" to="/props/?title=color">Edit</Link>
               </div>

               <label className="form__label">Size:</label>
               <div className="form__select-wrapper">
                  <div className="form__select-item">
                     <select name="size" id="size" className="form__select">
                        <option></option>
                     </select>
                  </div>
                  <Link className="form__link menu__link" to="/props/?title=size">Edit</Link>
               </div>

               <label className="form__label">Category:</label>
               <div className="form__select-wrapper">
                  <div className="form__select-item">
                     <select name="category" id="category" className="form__select">
                        <option></option>
                     </select>
                  </div>
                  <Link className="form__link menu__link" to="/props/?title=category">Edit</Link>
               </div>

               <label className="form__label">Image:</label>
               <input className="form__input" type="file" id="image" name="image" />

               <button className="form__button button">
                  Add
               </button>
            </div>
         </div>
      </main>
   );
};

export default AddProductForm;
