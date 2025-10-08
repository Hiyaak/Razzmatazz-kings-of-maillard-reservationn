import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import TimeSlots from '../Components/TimeSlots'
import Calendar from '../Components/Calendar'
import Controls from '../components/Controls'

const BookingPage = () => {
  const navigate = useNavigate()

  // ---- State Management ----
  const [guests, setGuests] = useState(2)
  const [selectedDay, setSelectedDay] = useState(null)

  // Set default date to today
  useEffect(() => {
    const today = new Date()
    setSelectedDay({
      day: today.getDate(),
      month: today.getMonth() + 1, // Month should be 1-indexed
      year: today.getFullYear()
    })
  }, [])

  // ---- Available Time Slots ----
  const slots = [
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
    '9:30 PM',
    '10:00 PM',
    '10:30 PM'
  ]

  // ---- Slot Click Handler ----
  const handleSlotClick = slot => {
    if (!selectedDay) {
      alert('Please select a date before choosing a time slot.')
      return
    }

    console.log('Navigating with:', {
      selectedTime: slot,
      selectedDate: selectedDay,
      numberOfGuests: guests
    })

    navigate('/userinfo', {
      state: {
        selectedTime: slot,
        selectedDate: selectedDay,
        numberOfGuests: guests
      }
    })
  }

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      {/* ---- Header ---- */}
      <Header />

      {/* ---- Main Content ---- */}
      <main className='max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8'>
        {/* ---- Left Section ---- */}
        <section className='lg:col-span-9'>
          {/* ---- Controls + Calendar Side by Side ---- */}
          <div className='flex flex-col md:flex-row gap-6 mb-6'>
            {/* Guests Dropdown */}
            <div className='flex-1 min-w-[150px]'>
              <Controls guests={guests} setGuests={setGuests} />
            </div>

            {/* Calendar */}
            <div className='flex-1 min-w-[300px]'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Select Date1
              </label>
              <Calendar
                selectedDate={selectedDay}
                onSelect={date => {
                  console.log('Date selected in BookingPage:', date)
                  setSelectedDay(date)
                }}
              />
            </div>
          </div>

          {/* ---- Time Slots ---- */}
          <div className='bg-white rounded-2xl shadow-sm p-6'>
            <h2 className='text-lg font-medium text-gray-800 mb-4'>
              Choose Your Time Slot
            </h2>
            <TimeSlots slots={slots} onSelect={handleSlotClick} />
          </div>
        </section>

        {/* ---- Sidebar ---- */}
        <aside className='lg:col-span-3'>
          <Sidebar />
        </aside>
      </main>
    </div>
  )
}

export default BookingPage
