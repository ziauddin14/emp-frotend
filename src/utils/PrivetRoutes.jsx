import React from 'react'
import { useAuth } from '../context/authContex'
import { Navigate } from 'react-router-dom'

const PrivetRoutes = ({children}) => {
    const {user, loading} = useAuth()

    if(loading){
        return <div>Loading......</div>
    }

    return user ? children : <Navigate to='/login' />
}

export default PrivetRoutes