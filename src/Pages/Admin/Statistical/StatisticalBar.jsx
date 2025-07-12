import React from 'react'
import AdminLineChart from './AdminLineChart'
import StatisticalNumbers from './StatisticalNumbers'

export default function StatisticalBar() {
  return (
    <div className='flex p-5 gap-4 max-sm:flex-col'>
      <AdminLineChart />
      <StatisticalNumbers />
    </div>
  )
}
