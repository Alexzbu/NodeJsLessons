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

const AppRoutes = ({ user, setToken, productList, setProductList, setAdd, setDel }) => {
   return (
      <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/catalog" element={<Catalog user={user} />} />
         <Route path="/cart"
            element={
               <Cart
                  user={user}
                  productList={productList}
                  setProductList={setProductList}
                  setAdd={setAdd}
                  setDel={setDel}
               />}
         />
         <Route path="/productCard/:id" element={<ProductCard user={user} setAdd={setAdd} />} />
         <Route path="/addProduct/:id?"
            element={
               // <ProtectedRoute isAuthenticated={isAuthenticated}>
               <AddProductForm />
               // </ProtectedRoute>
            } />
         <Route path="/props" element={<Props user={user} />} />
         <Route path="/addProps/:id?/:title"
            element={
               // <ProtectedRoute isAuthenticated={isAuthenticated}>
               <AddPropsForm />
               // </ProtectedRoute>
            } />
         <Route path="/login" element={<Login setToken={setToken} />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   );
};

export default AppRoutes;
