import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-gradient-to-r from-[#010125] via-[#0f0f9d] to-[#010125] py-4 text-white flex flex-col gap-1 mt-10'>
        <div className='mx-auto flex gap-2'>
            <p className='my-auto'>Designed and Created with ❤ by</p>
            <span className='text-xl font-bold text-center my-auto'>Dhruv</span>
        </div>
        <div className='mx-auto'>
        &copy; 2023 Bloggers.com, All rights reserved.
        </div>
    </div>
  )
}

export default Footer