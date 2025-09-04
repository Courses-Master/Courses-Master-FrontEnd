import React from 'react'
import StatisticalBar from './components/StatisticalBar'
import Navbar from '@/Layout/NavBar'
import UpComingEvent from './components/UpComingEvent'
import EventsAdminSidebar from '@/Layout/AdminSideBar'

export default function AdminHome() {

  return (
    <>
      <div className='flex min-h-screen '>
        <EventsAdminSidebar />
        <div className="flex-1 bg-gray-100">
          <Navbar />
          <StatisticalBar />
        </div>
      </div>
    </>
  )
}
