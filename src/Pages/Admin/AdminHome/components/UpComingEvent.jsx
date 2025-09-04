import React from 'react'

export default function UpComingEvent() {
    const events = [
        {
            name: "Tech Innovation Summit",
            date: "2025-02-18",
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
            name: "Global Marketing Expo",
            date: "2025-04-10",
            avatar: "https://i.pravatar.cc/150?img=2"
        },
        {
            name: "Healthcare Digital Forum",
            date: "2025-07-23",
            avatar: "https://i.pravatar.cc/150?img=3"
        },
        {
            name: "Healthcare Digital Forum",
            date: "2025-09-15",
            avatar: "https://i.pravatar.cc/150?img=4"
        },
        {
            name: "International Education Fair",
            date: "2025-11-05",
            avatar: "https://i.pravatar.cc/150?img=5"
        }
    ];

    return (
        <div className=' h-fit bg-white p-2   rounded-2xl'>
            <h1 className='font-bold mt-2 pl-1'>UPCOMING EVENTS</h1>
            {events.map((e) => (
                <div className='w-full min-h-[56px] my-3 shadow-lg shadow-[#EEEEEE] border border-[#F7F7F7] flex items-center pl-2  gap-3 rounded-[10px] '>
                    <div className='w-9 h-9'>
                        <img className='w-full h-full rounded-full border border-black' src={e.avatar} />
                    </div>
                    <div className='text-[12px]'>
                        <h3>
                            Event : {e.name.split(" ").length > 2 ?
                                e.name.split(" ")[0] + " " + e.name.split(" ")[1]
                                : e.name
                            }
                        </h3>
                        <h3>Date : {e.date}</h3>
                    </div>
                </div>
            ))}

        </div>
    )
}
