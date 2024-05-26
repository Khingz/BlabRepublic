import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/userContext'
import Spinner from '../components/spinner';

const ProtectedRoutes = () => {
    const {isLoggedIn, isLoading} = useAuth();

    if (isLoading) {
        return <Spinner />
    }

    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/login' />
    )
}

export default ProtectedRoutes