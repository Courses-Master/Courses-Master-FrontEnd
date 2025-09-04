import React, { useEffect, useState } from 'react'
import StatisticalNumbers from './StatisticalNumbers'
import UpComingEvent from './UpComingEvent'
import EventsPieChart from './EventsPieChart'
import { AdminLineChart } from './AdminLineChart'
import LatestEventSeating from './LatestEventSeating'
import { encryptStorage } from '@/utils/storage'

export default function StatisticalBar() {
  const [data, setData] = useState({})
  const storeAuth = encryptStorage.getItem('auth')

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storeAuth?.token}`,
      },
    }
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/events/get-admin-home`, options);
        const result = await res.json();
        setData(result?.data);
      } catch (err) {
        console.error("Error fetching Events:", err);
      }
    };

    fetchEvents();
  }, []);
  
  return (
    <>
      <div className='flex  pl-2  mx-6 justify-between gap-3.5 items-start  overflow-hidden'>
        <div className='flex-1'>
          <StatisticalNumbers statNumbers={data?.statNumbers} />
          <div className='flex gap-5 py-2'>
            <AdminLineChart />
            <EventsPieChart />
          </div>
        </div>
        <div className='flex-1'>
          <UpComingEvent />
        </div>
      </div>
      <div>
        <LatestEventSeating />
      </div>
    </>
  )
}
