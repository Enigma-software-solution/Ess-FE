import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';

const ProtectedRoutes = () => {
  // const isAuth = useSelector((state=> state.auth.token))
  const isAuth = true  
  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoutes

