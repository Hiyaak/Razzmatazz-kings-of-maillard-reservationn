import React, { useState, useRef, useEffect } from 'react'

export function Control ({ label, children }) {
  return (
    <div className='bg-white border rounded-lg shadow-sm p-3'>
      <div className='text-sm text-gray-500 mb-1'>{label}</div>
      <div>{children}</div>
    </div>
  )
}

export default function Controls ({ guests, setGuests }) {
  const [guestsOpen, setGuestsOpen] = useState(false)
  const guestRef = useRef(null)

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside (e) {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setGuestsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='grid grid-cols-2 gap-4 mb-6'>
      {/* Guests Dropdown */}
      <div className='relative' ref={guestRef}>
        <Control label='Guests'>
          <button
            type='button'
            onClick={() => setGuestsOpen(prev => !prev)}
            aria-expanded={guestsOpen}
            className='w-full py-3 px-4 flex justify-between items-center border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-300 outline-none bg-white'
          >
            <span className='text-gray-700'>
              {guests} Guest{guests > 1 ? 's' : ''}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                guestsOpen ? 'rotate-180' : ''
              }`}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.11 1.01l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {guestsOpen && (
            <div className='absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg py-1 max-h-48 overflow-auto'>
              {Array.from({ length: 20 }, (_, i) => {
                const val = i + 1
                return (
                  <div
                    key={val}
                    className={`py-2.5 px-4 cursor-pointer transition-colors ${
                      val === guests
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setGuests(val)
                      setGuestsOpen(false)
                    }}
                  >
                    {val} Guest{val > 1 ? 's' : ''}
                  </div>
                )
              })}
            </div>
          )}
        </Control>
      </div>
    </div>
  )
}
