import React from 'react'
import mapImg from '../assets/map-placeholder.svg'

export default function Sidebar () {
  return (
    <aside className='space-y-6'>
      <div className='bg-white rounded p-6'>
        <h3 className='text-lg font-bold'>Kings of Maillard</h3>
        <p className='text-sm text-gray-600 mt-3 leading-6'>
          At Kings of Maillard, we believe in no-fuss dining, where the focus
          remains on the food and the experience it creates. Whether you're
          indulging in a familiar favorite or daring to try something new, we
          invite you to savor every bite and savor the journey with us.
        </p>
        <div className='mt-4'>
          <img
            src={mapImg}
            alt='map'
            className='w-40 h-28 object-cover rounded'
          />
        </div>
        <div className='mt-3 text-sm text-gray-500'>
          Shuwaikh Industrial, Kuwait City
          <br />
          Kuwait, Shuwaikh Industrial, Al Asimah Governate
        </div>
      </div>

      <div className='bg-white rounded p-4 text-center'>
        <button className='bg-purple-700 text-white py-2 px-4 rounded'>
          Experience By SevenRooms
        </button>
      </div>
    </aside>
  )
}
