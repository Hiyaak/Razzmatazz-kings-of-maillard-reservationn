// import React, { useState, useRef, useEffect } from 'react'
// import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

// // Day Component
// function Day ({ day, isSelected, onClick, isDisabled }) {
//   if (!day) return <div className='py-2'></div>

//   return (
//     <button
//       type='button'
//       onClick={() => !isDisabled && onClick(day)}
//       disabled={isDisabled}
//       className={`h-10 w-10 flex items-center justify-center rounded-md font-medium transition-all
//         ${
//           isSelected
//             ? 'bg-black text-white'
//             : isDisabled
//             ? 'text-gray-300 cursor-not-allowed'
//             : 'text-gray-900 hover:bg-gray-100 cursor-pointer'
//         }`}
//     >
//       {day}
//     </button>
//   )
// }

// // Month Calendar Component
// function MonthCalendar ({ month, year, selectedDate, onSelectDate }) {
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ]

//   const daysInMonth = new Date(year, month + 1, 0).getDate()
//   const firstDayOfMonth = new Date(year, month, 1).getDay()

//   const days = []

//   // Empty cells before the first day
//   for (let i = 0; i < firstDayOfMonth; i++) {
//     days.push(null)
//   }

//   // Actual days
//   for (let i = 1; i <= daysInMonth; i++) {
//     days.push(i)
//   }

//   const isDateSelected = day => {
//     if (!day || !selectedDate) return false
//     return (
//       selectedDate.day === day &&
//       selectedDate.month === month &&
//       selectedDate.year === year
//     )
//   }

//   const isPastDate = day => {
//     if (!day) return false
//     const today = new Date()
//     const dateToCheck = new Date(year, month, day)
//     today.setHours(0, 0, 0, 0)
//     dateToCheck.setHours(0, 0, 0, 0)
//     return dateToCheck < today
//   }

//   const handleDayClick = day => {
//     onSelectDate({ day, month, year })
//   }

//   return (
//     <div className='flex-1 min-w-[360px]'>
//       <h3 className='text-lg font-semibold text-center mb-4'>
//         {monthNames[month]} {year}
//       </h3>
//       <div className='grid grid-cols-7 gap-2'>
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
//           <div
//             key={d}
//             className='text-center text-sm font-medium text-gray-600 py-1'
//           >
//             {d}
//           </div>
//         ))}
//         {days.map((day, idx) => (
//           <Day
//             key={idx}
//             day={day}
//             isSelected={isDateSelected(day)}
//             onClick={handleDayClick}
//             isDisabled={!day || isPastDate(day)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// // Main Calendar Component
// export default function Calendar ({ selectedDate, onSelect }) {
//   const [currentMonthOffset, setCurrentMonthOffset] = useState(0)
//   const [isOpen, setIsOpen] = useState(false)
//   const calendarRef = useRef(null)

//   const today = new Date()
//   const currentMonth = today.getMonth()
//   const currentYear = today.getFullYear()

//   // Calculate display months
//   const firstMonth = new Date(currentYear, currentMonth + currentMonthOffset, 1)
//   // const secondMonth = new Date(currentYear, currentMonth + currentMonthOffset + 1, 1);

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = event => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setIsOpen(false)
//       }
//     }
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [isOpen])

//   const formatSelectedDate = date => {
//     if (!date) return 'Today'
//     const monthNames = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec'
//     ]
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
//     const dayOfWeek = new Date(date.year, date.month, date.day).getDay()
//     return `${dayNames[dayOfWeek]}, ${monthNames[date.month]} ${date.day}`
//   }

//   const handlePrevMonth = () => {
//     setCurrentMonthOffset(prev => prev - 1)
//   }

//   const handleNextMonth = () => {
//     setCurrentMonthOffset(prev => prev + 1)
//   }

//   const handleDateSelect = date => {
//     onSelect(date)
//     setIsOpen(false)
//   }

//   return (
//     <div className='relative w-full' ref={calendarRef}>
//       {/* Date Display Button */}
//       <button
//         type='button'
//         onClick={() => setIsOpen(!isOpen)}
//         className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors text-left'
//       >
//         <div className='flex-1'>
//           <div className='text-base font-medium text-gray-900'>
//             {formatSelectedDate(selectedDate)}
//           </div>
//         </div>
//         <ChevronDown
//           className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-2 ${
//             isOpen ? 'rotate-180' : ''
//           }`}
//         />
//       </button>

//       {/* Calendar Dropdown */}
//       {isOpen && (
//         <div className='absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden'>
//           <div className='p-4 md:p-6'>
//             {/* Navigation */}
//             <div className='flex items-center justify-between mb-4 md:mb-6'>
//               <button
//                 type='button'
//                 onClick={handlePrevMonth}
//                 className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
//                 aria-label='Previous month'
//               >
//                 <ChevronLeft className='w-5 h-5' />
//               </button>
//               <button
//                 type='button'
//                 onClick={handleNextMonth}
//                 className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
//                 aria-label='Next month'
//               >
//                 <ChevronRight className='w-5 h-5' />
//               </button>
//             </div>

//             {/* Responsive Layout */}
//             <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-8'>
//               {/* Always show first month */}
//               <MonthCalendar
//                 month={firstMonth.getMonth()}
//                 year={firstMonth.getFullYear()}
//                 selectedDate={selectedDate}
//                 onSelectDate={handleDateSelect}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

// Day Component
function Day({ day, isSelected, onClick, isDisabled }) {
  if (!day) return <div className='py-2'></div>

  return (
    <button
      type='button'
      onClick={() => !isDisabled && onClick(day)}
      disabled={isDisabled}
      className={`h-10 w-10 flex items-center justify-center rounded-md font-medium transition-all
        ${
          isSelected
            ? 'bg-black text-white'
            : isDisabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-900 hover:bg-gray-100 cursor-pointer'
        }`}
    >
      {day}
    </button>
  )
}

// Month Calendar Component
function MonthCalendar({ month, year, selectedDate, onSelectDate }) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const days = []

  for (let i = 0; i < firstDayOfMonth; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const isDateSelected = day => {
    if (!day) return false
    return day === selectedDate.day && month === selectedDate.month && year === selectedDate.year
  }

  const isPastDate = day => {
    if (!day) return false
    const today = new Date()
    const dateToCheck = new Date(year, month, day)
    today.setHours(0, 0, 0, 0)
    dateToCheck.setHours(0, 0, 0, 0)
    return dateToCheck < today
  }

  return (
    <div className='flex-1 min-w-[400px]'>
      <h3 className='text-lg font-semibold text-center mb-4'>
        {monthNames[month]} {year}
      </h3>
      <div className='grid grid-cols-7 gap-2'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className='text-center text-sm font-medium text-gray-600 py-1'>
            {d}
          </div>
        ))}
        {days.map((day, idx) => (
          <Day
            key={idx}
            day={day}
            isSelected={isDateSelected(day)}
            onClick={day => onSelectDate({ day, month, year })}
            isDisabled={!day || isPastDate(day)}
          />
        ))}
      </div>
    </div>
  )
}

// Main Calendar Component
export default function Calendar({ selectedDate: propSelectedDate, onSelect }) {
  const today = new Date()
  const todayDate = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() }

  // Initialize selectedDate with today if no prop is provided
  const [selectedDate, setSelectedDate] = useState(propSelectedDate || todayDate)
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const calendarRef = useRef(null)

  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const firstMonth = new Date(currentYear, currentMonth + currentMonthOffset, 1)

  useEffect(() => {
    const handleClickOutside = event => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const formatSelectedDate = date => {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    const d = date || todayDate
    const dayOfWeek = new Date(d.year, d.month, d.day).getDay()
    return `${dayNames[dayOfWeek]}, ${monthNames[d.month]} ${d.day}`
  }

  const handlePrevMonth = () => setCurrentMonthOffset(prev => prev - 1)
  const handleNextMonth = () => setCurrentMonthOffset(prev => prev + 1)

  const handleDateSelect = date => {
    setSelectedDate(date)
    onSelect(date)
    setIsOpen(false)
  }

  return (
    <div className='relative w-full' ref={calendarRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors text-left'
      >
        <div className='flex-1'>
          <div className='text-base font-medium text-gray-900'>
            {formatSelectedDate(selectedDate)}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden'>
          <div className='p-4 md:p-6'>
            <div className='flex items-center justify-between mb-4 md:mb-6'>
              <button type='button' onClick={handlePrevMonth} className='p-2 hover:bg-gray-100 rounded-lg transition-colors' aria-label='Previous month'>
                <ChevronLeft className='w-5 h-5' />
              </button>
              <button type='button' onClick={handleNextMonth} className='p-2 hover:bg-gray-100 rounded-lg transition-colors' aria-label='Next month'>
                <ChevronRight className='w-5 h-5' />
              </button>
            </div>

            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-8'>
              <MonthCalendar
                month={firstMonth.getMonth()}
                year={firstMonth.getFullYear()}
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

