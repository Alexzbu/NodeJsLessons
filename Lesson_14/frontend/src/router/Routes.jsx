import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from '../views/MainPage'
import Catalog from '../views/Catalog';
import ProductCard from '../views/products/ProductCard';
import AddProductForm from '../views/products/AddProductForm';
import Cart from '../views/products/Cart';
import Props from '../views/props/Props';
import AddPropsForm from '../views/props/AddPropsForm';
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'


const ProtectedRoute = ({ children, isAuthenticated }) => {
   return isAuthenticated ? children : <Navigate to="/login" />
}

const AppRoutes = ({ isAuthenticated, setIsAuthenticated, userId }) => {
   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/catalog" element={<Catalog isAuthenticated={isAuthenticated} />} />
         <Route path="/cart" element={<Cart isAuthenticated={isAuthenticated} userId={userId} />} />
         <Route path="/productCard/:id" element={<ProductCard userId={userId} />} />
         <Route path="/addProduct/:id?"
            element={
               // <ProtectedRoute isAuthenticated={isAuthenticated}>
               <AddProductForm />
               // </ProtectedRoute>
            } />
         <Route path="/props" element={<Props isAuthenticated={isAuthenticated} />} />
         <Route path="/addProps/:id?/:title"
            element={
               // <ProtectedRoute isAuthenticated={isAuthenticated}>
               <AddPropsForm />
               // </ProtectedRoute>
            } />
         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   );
};

export default AppRoutes;
