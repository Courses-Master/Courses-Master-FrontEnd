import React from 'react'

export default function SideImage() {
    return (
        <div className='basis-[80%] max-lg:hidden  relative  h-screen bg-[url("/src/assets/students-future.jpg")] bg-cover'>
            <div className=' absolute w-full h-full z-40 bg-[#2029399c] '></div>
        </div>
    )
}
