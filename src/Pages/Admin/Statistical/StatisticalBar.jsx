import React from 'react'
import AdminLineChart from './AdminLineChart'
import StatisticalNumbers from './StatisticalNumbers'

export default function StatisticalBar() {
  return (
    <div className='flex p-2 gap-4 flex-col flex-1 items-center  overflow-hidden'>
      <AdminLineChart />
      <StatisticalNumbers />
    </div>
  )
}
