import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from '../views/MainPage'
import Catalog from '../views/Catalog';
import CarsScroll from '../views/cars/CarsScroll'
import AddCarForm from '../views/cars/AddCarForm'
import CarDetail from '../views/cars/CarDetails'
import Locations from '../views/locations/Locations'
import AddLocationForm from '../views/locations/AddLocationForm'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'


const ProtectedRoute = ({ children, isAuthenticated }) => {
   return isAuthenticated ? children : <Navigate to="/login" />
}

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/catalog" element={<Catalog isAuthenticated={isAuthenticated} />} />
         <Route path="/carsScroll" element={<CarsScroll isAuthenticated={isAuthenticated} />} />
         <Route path="/carDetail/:id" element={<CarDetail />} />
         <Route path="/addCar/:id?"
            element={
               <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AddCarForm />
               </ProtectedRoute>
            } />
         <Route path="/locations" element={<Locations isAuthenticated={isAuthenticated} />} />
         <Route path="/addLocation/:id?"
            element={
               <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AddLocationForm />
               </ProtectedRoute>
            } />
         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   );
};

export default AppRoutes;
