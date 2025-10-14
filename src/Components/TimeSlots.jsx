import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TimeSlots ({ slots = [], onSelect, bookedSlots = [], selectedDate }) {
  const navigate = useNavigate()

  // Check if a slot is booked for the selected date
  const isSlotBooked = (slot) => {
    return bookedSlots.some(booked => 
      booked.date.day === selectedDate?.day &&
      booked.date.month === selectedDate?.month &&
      booked.date.year === selectedDate?.year &&
      booked.time === slot &&
      booked.guests >= 20
    )
  }

  const handleSlotClick = slot => {
    if (onSelect) {
      onSelect(slot) // Call parent handler if provided
    } else {
      // Fallback: direct navigation (in case BookingPage doesn't pass handler)
      navigate('/userinfo', { state: { selectedTime: slot } })
    }
  }

  return (
    <div className='bg-white border rounded p-6 shadow'>
      <div className='grid grid-cols-3 gap-4'>
        {slots.map(s => {
          const booked = isSlotBooked(s)
          return (
            <button
              key={s}
              onClick={() => !booked && handleSlotClick(s)}
              disabled={booked}
              className={`h-16 rounded-md flex flex-col justify-center items-center transition ${
                booked 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-purple-500 text-white hover:bg-purple-900'
              }`}
            >
              <div className='font-semibold'>{s}</div>
              <div className='text-xs text-slate-200'>
                {booked ? 'Fully Booked' : 'À la carte'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}