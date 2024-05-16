import React from 'react'

export const Appbar = ({username}) => {
  return (
    <div className='shadow h-14 flex justify-between'>
        <div className='flex flex-col justify-center h-full ml-4'>
            EasyPay App
        </div>
        <div className='flex'>
            <div className='flex flex-col justify-center h-full mr-4'>
                {username}
            </div>
            <div className='rounded-full h-12 w-12 bg-slate-50 flex justify-center mt-1 mr-2'>
                <div className='flex flex-col justify-center h-full text-xl'>
                   {}
                </div>
            </div>
        </div>
    </div>
  )
}
