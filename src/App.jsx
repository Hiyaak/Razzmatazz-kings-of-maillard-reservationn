import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import BookingPage from './Pages/BookingPage'
import UserInformation from './Pages/UserInformation'

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BookingPage />} />
        <Route path='/userinfo' element={<UserInformation />} />
      </Routes>
    </Router>
  )
}
