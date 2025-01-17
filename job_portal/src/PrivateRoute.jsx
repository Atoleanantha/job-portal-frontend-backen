import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    let isLogin=localStorage.getItem('isLogin')
    if(isLogin){
       return <Outlet/>
    }else{
        return <Navigate to={'/logIn'}/>
    }
  
}

export default PrivateRoute
