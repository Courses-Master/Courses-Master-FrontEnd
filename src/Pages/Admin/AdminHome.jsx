import NavBar from '@/NavBar'
import NabBar from '@/NavBar'
import React from 'react'
import StatisticalBar from './Statistical/StatisticalBar'
import { encryptStorage } from '@/utils/storage'

export default function AdminHome() {
  const storeAuth = encryptStorage.getItem("auth")
  return (
    <>
      <NavBar/>
      <h1 className='text-5xl p-6 max-sm:text-3xl'>Hello.. {storeAuth?.data?.name}</h1>
      <StatisticalBar/>
    </>
  )
}
