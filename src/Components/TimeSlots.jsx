import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TimeSlots ({ slots = [], onSelect }) {
  const navigate = useNavigate()

  const handleSlotClick = slot => {
    if (onSelect) {
      onSelect(slot) // Call parent handler if provided
    } else {
      // Fallback: direct navigation (in case BookingPage doesn’t pass handler)
      navigate('/userinfo', { state: { selectedTime: slot } })
    }
  }

  return (
    <div className='bg-white border rounded p-6 shadow'>
   
      <div className='grid grid-cols-3 gap-4'>
        {slots.map(s => (
          <button
            key={s}
            onClick={() => handleSlotClick(s)}
            className='bg-purple-500 text-white h-16 rounded-md flex flex-col justify-center items-center hover:bg-purple-900 transition'
          >
            <div className='font-semibold'>{s}</div>
            <div className='text-xs text-slate-200'>À la carte</div>
          </button>
        ))}
      </div>
    </div>
  )
}
