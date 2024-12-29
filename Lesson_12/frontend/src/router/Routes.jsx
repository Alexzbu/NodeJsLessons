import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from '../views/MainPage'
import Cars from '../views/cars/Cars'
import AddCarForm from '../views/cars/AddCarForm'
import Locations from '../views/locations/Locations'
import AddLocationForm from '../views/locations/AddLocationForm'


const isAuthenticated = () => {
   return localStorage.getItem('authToken') !== null
}

const ProtectedRoute = ({ children }) => {
   return isAuthenticated() ? children : <Navigate to="/" />
}

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/cars" element={<Cars />} />
         <Route path="/addCar" element={<AddCarForm />} />
         <Route path="/locations" element={<Locations />} />
         <Route path="/addLocation" element={<AddLocationForm />} />
      </Routes>
   );
};

export default AppRoutes;
