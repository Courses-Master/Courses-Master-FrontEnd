import React from 'react'
import StatisticalBar from './Statistical/StatisticalBar'
import { encryptStorage } from '@/utils/storage'
import SideBar from '@/SideBar'

export default function AdminHome() {
  const storeAuth = encryptStorage.getItem("auth")

  return (
    <>
      <div className='flex min-h-screen '>
        <div className="w-64 max-md:w-16 ">
          <SideBar />
        </div>
        <div className="flex-1 bg-gray-100">
          <StatisticalBar />
        </div>
      </div>
    </>
  )
}
