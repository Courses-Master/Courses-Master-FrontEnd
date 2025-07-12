import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { encryptStorage } from '../utils/storage'
import { Auth } from './AuthContext'
export default function RequiredAuth() {
    const { authData } = useContext(Auth)
    const storeAuth = encryptStorage.getItem('auth')
    return storeAuth?.token || authData?.token ? <Outlet /> : <Navigate to="/signIn" />;
}
