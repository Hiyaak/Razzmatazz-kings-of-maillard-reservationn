// import React, { useState, useEffect } from 'react';
// import {
//   ChevronLeft,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Info,
// } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const UserInformation = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get data from BookingPage
//   const bookingData = location.state || {};
//   console.log('Booking Data:', bookingData); // Debug log

//   const selectedTime = bookingData.selectedTime || '12:30 PM';
//   const selectedDate = bookingData.selectedDate;
//   const numberOfGuests = bookingData.numberOfGuests || 2;

//   // Format date for display - fixed version
//   const formatDateForDisplay = () => {
//     console.log('Selected Date:', selectedDate); // Debug log

//     if (!selectedDate) {
//       return {
//         dayOfWeek: '',
//         month: '',
//         day: '',
//         year: '',
//         fullDate: '',
//       };
//     }

//     // Handle different date formats
//     let dateObj;
//     if (selectedDate instanceof Date) {
//       dateObj = selectedDate;
//     } else if (
//       selectedDate.day &&
//       selectedDate.month !== undefined &&
//       selectedDate.year
//     ) {
//       // If it's our custom date object {day, month, year}
//       dateObj = new Date(
//         selectedDate.year,
//         selectedDate.month,
//         selectedDate.day
//       );
//     } else if (selectedDate.date) {
//       // If it's from the Calendar component
//       dateObj = new Date(selectedDate.date);
//     } else {
//       // Fallback to current date
//       dateObj = new Date();
//     }

//     const months = [
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
//       'Dec',
//     ];
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const fullMonths = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     const fullDays = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//     ];

//     const dayOfWeekIndex = dateObj.getDay();
//     const monthIndex = dateObj.getMonth();
//     const day = dateObj.getDate();
//     const year = dateObj.getFullYear();

//     return {
//       dayOfWeek: daysOfWeek[dayOfWeekIndex],
//       month: months[monthIndex],
//       day: day.toString(),
//       year: year.toString(),
//       fullDate: `${fullDays[dayOfWeekIndex]}, ${fullMonths[monthIndex]} ${day}, ${year}`,
//     };
//   };

//   const formattedDate = formatDateForDisplay();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     birthdayMonth: '',
//     birthdayDay: '',
//     specialOccasion: [],
//     dietaryRestrictions: [],
//     partyDietaryRestrictions: [],
//     additionalNotes: '',
//     receiveVenueNews: true,
//     receiveAllNews: true,
//     robotCheck: false,
//   });

//   const [expandedSections, setExpandedSections] = useState({
//     specialOccasion: false,
//     dietaryRestrictions: false,
//     partyDietaryRestrictions: false,
//     additionalNotes: false,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [specialOccasions, setSpecialOccasions] = useState([]);
//   const [loadingOccasions, setLoadingOccasions] = useState(true);
//   const [dietaryOptions, setDietaryOptions] = useState([]);
//   const [loadingDietary, setLoadingDietary] = useState(true);
//   const [partyDietaryOptions, setPartyDietaryOptions] = useState([]);
//   const [loadingPartyDietary, setLoadingPartyDietary] = useState(true);

//   // Fetch special occasions from API
//   useEffect(() => {
//     const fetchSpecialOccasions = async () => {
//       try {
//         setLoadingOccasions(true);
//         const requestOptions = {
//           method: 'GET',
//           redirect: 'follow',
//         };

//         const response = await fetch(
//           'http://13.126.81.242:5001/getAllSpecialOccasions',
//           requestOptions
//         );
//         const result = await response.json();

//         if (result.status && Array.isArray(result.occasions)) {
//           // Extract just the names from the occasions array
//           const occasionNames = result.occasions.map(
//             (occasion) => occasion.name
//           );
//           setSpecialOccasions(occasionNames);
//         } else {
//           console.error('Invalid API response format:', result);
//           setSpecialOccasions([]);
//         }
//       } catch (error) {
//         console.error('Error fetching special occasions:', error);
//         setSpecialOccasions([]);
//       } finally {
//         setLoadingOccasions(false);
//       }
//     };

//     fetchSpecialOccasions();
//   }, []);

//   // Fetch dietary restrictions from API
//   useEffect(() => {
//     const fetchDietaryRestrictions = async () => {
//       try {
//         setLoadingDietary(true);
//         const requestOptions = {
//           method: 'GET',
//           redirect: 'follow',
//         };

//         const response = await fetch(
//           'http://13.126.81.242:5001/getAllDietaryRestrictions',
//           requestOptions
//         );
//         const result = await response.json();

//         if (result.status && Array.isArray(result.restrictions)) {
//           // Extract just the names from the restrictions array
//           const restrictionNames = result.restrictions.map(
//             (restriction) => restriction.name
//           );
//           setDietaryOptions(restrictionNames);
//         } else {
//           console.error('Invalid API response format:', result);
//           setDietaryOptions([]);
//         }
//       } catch (error) {
//         console.error('Error fetching dietary restrictions:', error);
//         setDietaryOptions([]);
//       } finally {
//         setLoadingDietary(false);
//       }
//     };

//     fetchDietaryRestrictions();
//   }, []);

//   // Fetch party dietary restrictions from API
//   useEffect(() => {
//     const fetchPartyDietaryRestrictions = async () => {
//       try {
//         setLoadingPartyDietary(true);
//         const requestOptions = {
//           method: 'GET',
//           redirect: 'follow',
//         };

//         const response = await fetch(
//           'http://13.126.81.242:5001/getAllPartyDietaryRestrictions',
//           requestOptions
//         );
//         const result = await response.json();

//         if (result.status && Array.isArray(result.restrictions)) {
//           // Extract just the names from the restrictions array
//           const restrictionNames = result.restrictions.map(
//             (restriction) => restriction.name
//           );
//           setPartyDietaryOptions(restrictionNames);
//         } else {
//           console.error('Invalid API response format:', result);
//           setPartyDietaryOptions([]);
//         }
//       } catch (error) {
//         console.error('Error fetching party dietary restrictions:', error);
//         setPartyDietaryOptions([]);
//       } finally {
//         setLoadingPartyDietary(false);
//       }
//     };

//     fetchPartyDietaryRestrictions();
//   }, []);

//   const handleBackClick = () => {
//     navigate('/');
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const toggleSelection = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter((item) => item !== value)
//         : [...prev[field], value],
//     }));
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // Reset form function
//   const resetForm = () => {
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phoneNumber: '',
//       birthdayMonth: '',
//       birthdayDay: '',
//       specialOccasion: [],
//       dietaryRestrictions: [],
//       partyDietaryRestrictions: [],
//       additionalNotes: '',
//       receiveVenueNews: true,
//       receiveAllNews: true,
//       robotCheck: false,
//     });
//     setExpandedSections({
//       specialOccasion: false,
//       dietaryRestrictions: false,
//       partyDietaryRestrictions: false,
//       additionalNotes: false,
//     });
//   };

//   // API Integration function
//   const submitBookingToAPI = async (bookingData) => {
//     const myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');

//     // Format date for API (YYYY-MM-DD) - FIXED VERSION
//     const formatDateForAPI = (date) => {
//       if (!date) {
//         const now = new Date();
//         return now.toISOString().split('T')[0];
//       }

//       let dateObj;
//       if (date instanceof Date) {
//         dateObj = date;
//       } else if (date.day && date.month !== undefined && date.year) {
//         // If it's our custom date object {day, month, year}
//         // Note: month is 0-indexed in JavaScript Date, so we use it as-is
//         dateObj = new Date(date.year, date.month, date.day);
//       } else if (date.date) {
//         // If it's from the Calendar component
//         dateObj = new Date(date.date);
//       } else {
//         // Fallback to current date
//         dateObj = new Date();
//       }

//       // Use local date components to avoid timezone issues
//       const year = dateObj.getFullYear();
//       const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
//       const day = dateObj.getDate().toString().padStart(2, '0');

//       return `${year}-${month}-${day}`;
//     };

//     // Format time for API (remove AM/PM and convert to 24h if needed)
//     const formatTimeForAPI = (time) => {
//       if (!time) return '12:00';

//       // Remove AM/PM and trim whitespace
//       const timeWithoutPeriod = time.replace(/[AP]M/i, '').trim();
//       return timeWithoutPeriod;
//     };

//     const raw = JSON.stringify({
//       firstName: bookingData.firstName,
//       lastName: bookingData.lastName,
//       email: bookingData.email,
//       phone: bookingData.phoneNumber,
//       dob: `${bookingData.birthdayMonth || ''}-${
//         bookingData.birthdayDay || ''
//       }`,
//       date: formatDateForAPI(selectedDate),
//       time: formatTimeForAPI(selectedTime),
//       personCount: numberOfGuests,
//       answer1: bookingData.specialOccasion.join(', ') || 'No',
//       answer2: bookingData.dietaryRestrictions.join(', ') || 'No',
//       answer3: bookingData.partyDietaryRestrictions.join(', ') || 'No',
//       answer4: bookingData.additionalNotes || 'No additional notes',
//     });

//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     try {
//       const response = await fetch(
//         'http://13.126.81.242:5001/TableBooking',
//         requestOptions
//       );
//       const result = await response.json();

//       if (result.status) {
//         return { success: true, data: result };
//       } else {
//         return { success: false, error: result.message || 'Booking failed' };
//       }
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const handleSubmit = async () => {
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.email ||
//       !formData.phoneNumber ||
//       !formData.robotCheck
//     ) {
//       alert('Please fill in all required fields and complete the reCAPTCHA');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const apiResult = await submitBookingToAPI(formData);

//       if (apiResult.success) {
//         console.log('Booking submitted successfully:', apiResult.data);
//         alert('Reservation submitted successfully!');

//         // Reset form fields after successful submission
//         resetForm();

//         // Navigate to BookingPage (home page)
//         navigate('/');
//       } else {
//         console.error('Booking failed:', apiResult.error);
//         alert(`Reservation failed: ${apiResult.error}`);
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//       alert(
//         'An error occurred while submitting your reservation. Please try again.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const calculateEndTime = (startTime, numberOfGuests) => {
//     const [time, modifier] = startTime.split(' ');
//     let [hours, minutes] = time.split(':').map(Number);

//     if (modifier === 'PM' && hours !== 12) hours += 12;
//     if (modifier === 'AM' && hours === 12) hours = 0;

//     const startDate = new Date();
//     startDate.setHours(hours, minutes, 0, 0);

//     // Base duration: 1.5 hours for 2 guests
//     // Extra 30 mins per additional guest above 2
//     const baseMinutes = 90;
//     const extraMinutes = numberOfGuests > 2 ? (numberOfGuests - 2) * 30 : 0;
//     const totalMinutes = baseMinutes + extraMinutes;

//     const endDate = new Date(startDate.getTime() + totalMinutes * 60 * 1000);

//     let endHours = endDate.getHours();
//     const endMinutes = endDate.getMinutes();
//     const endModifier = endHours >= 12 ? 'PM' : 'AM';

//     endHours = endHours % 12;
//     endHours = endHours ? endHours : 12;

//     return `${endHours}:${endMinutes
//       .toString()
//       .padStart(2, '0')} ${endModifier}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <h1 className="text-2xl font-serif text-center tracking-wide">
//             KINGS OF MAILLARD
//           </h1>
//         </div>
//       </div>

//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <button
//               onClick={handleBackClick}
//               className="flex items-center hover:text-gray-900 transition-colors"
//             >
//               <ChevronLeft className="w-5 h-5 mr-1" />
//             </button>
//             <div className="flex-1 flex items-center justify-center">
//               {' '}
//               {/* Changed this line */}
//               <div className="flex items-center gap-2 flex-wrap justify-center">
//                 <span>Kings of Maillard</span>
//                 <span>•</span>
//                 <span>
//                   {formattedDate.dayOfWeek}, {formattedDate.month}{' '}
//                   {formattedDate.day}
//                 </span>
//                 <span>•</span>
//                 <span>{selectedTime}</span>
//                 <span>•</span>
//                 <span>
//                   {numberOfGuests} {numberOfGuests === 1 ? 'guest' : ''}
//                 </span>
//               </div>
//             </div>
//             <div className="w-6"></div> {/* Added this for balance */}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-2">Your information</h2>
//                 <p className="text-sm text-gray-600 mb-6">
//                   Please select an option below to continue checkout:
//                 </p>

//                 {/* Social Login Buttons */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                   <button
//                     type="button"
//                     className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
//                   >
//                     <svg className="w-5 h-5" viewBox="0 0 24 24">
//                       <path
//                         fill="#4285F4"
//                         d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                       />
//                       <path
//                         fill="#34A853"
//                         d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                       />
//                       <path
//                         fill="#FBBC05"
//                         d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                       />
//                       <path
//                         fill="#EA4335"
//                         d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                       />
//                     </svg>
//                     <span className="text-sm">Sign in with Google</span>
//                   </button>
//                   <button
//                     type="button"
//                     className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                     </svg>
//                     <span className="text-sm font-medium">
//                       LOGIN WITH FACEBOOK
//                     </span>
//                   </button>
//                 </div>

//                 <div className="relative mb-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">
//                       Or continue as a guest
//                     </span>
//                   </div>
//                 </div>

//                 {/* Form Fields */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="First Name"
//                       value={formData.firstName}
//                       onChange={(e) =>
//                         handleInputChange('firstName', e.target.value)
//                       }
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name*
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Last Name"
//                       value={formData.lastName}
//                       onChange={(e) =>
//                         handleInputChange('lastName', e.target.value)
//                       }
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address*
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="email"
//                         placeholder="Email Address"
//                         value={formData.email}
//                         onChange={(e) =>
//                           handleInputChange('email', e.target.value)
//                         }
//                         className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-0  focus:border-transparent"
//                       />
//                       <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 text-xl">
//                         ✉
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone Number*
//                     </label>
//                     <div className="flex gap-2">
//                       <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm w-21">
//                         <option value="+965">🇰🇼 +965</option>
//                       </select>
//                       <input
//                         type="tel"
//                         placeholder="Phone Number"
//                         value={formData.phoneNumber}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           // Allow only digits and limit to 8 characters
//                           if (/^\d{0,8}$/.test(value)) {
//                             handleInputChange('phoneNumber', value);
//                           }
//                         }}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Birthday
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="mm"
//                         value={formData.birthdayMonth}
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^0-9]/g, '');
//                           if (
//                             value === '' ||
//                             (parseInt(value) >= 1 && parseInt(value) <= 12)
//                           ) {
//                             handleInputChange('birthdayMonth', value);
//                           }
//                         }}
//                         maxLength={2}
//                         className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
//                       />
//                       <input
//                         type="text"
//                         placeholder="dd"
//                         value={formData.birthdayDay}
//                         onChange={(e) => {
//                           const value = e.target.value.replace(/[^0-9]/g, '');
//                           const month = parseInt(formData.birthdayMonth) || 1;

//                           // Determine max days based on month
//                           let maxDays = 31;
//                           if ([4, 6, 9, 11].includes(month)) {
//                             maxDays = 30;
//                           } else if (month === 2) {
//                             maxDays = 29; // Simplified - could add leap year logic
//                           }

//                           if (
//                             value === '' ||
//                             (parseInt(value) >= 1 && parseInt(value) <= maxDays)
//                           ) {
//                             handleInputChange('birthdayDay', value);
//                           }
//                         }}
//                         maxLength={2}
//                         className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* reCAPTCHA */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-3 p-4 border border-gray-300 rounded bg-gray-50 w-fit">
//                   <input
//                     type="checkbox"
//                     checked={formData.robotCheck}
//                     onChange={(e) =>
//                       handleInputChange('robotCheck', e.target.checked)
//                     }
//                     className="w-6 h-6"
//                   />
//                   <span className="text-sm">I'm not a robot</span>
//                   <div className="ml-4">
//                     <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
//                       reCAPTCHA
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-600 mb-6">
//                 If you'd like, tell us more about yourself and your preferences
//                 so we can provide a better experience.
//               </p>

//               {/* Expandable Sections */}
//               <div className="space-y-4">
//                 {/* Special Occasion */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('specialOccasion')}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-medium">
//                       Is this a Special Occasion?
//                     </span>
//                     <span className="text-2xl text-gray-500">
//                       {expandedSections.specialOccasion ? '−' : '+'}
//                     </span>
//                   </button>
//                   {expandedSections.specialOccasion && (
//                     <div className="p-4 pt-0 bg-white">
//                       {loadingOccasions ? (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">Loading occasions...</p>
//                         </div>
//                       ) : specialOccasions.length > 0 ? (
//                         <>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {specialOccasions.map((occasion) => (
//                               <button
//                                 key={occasion}
//                                 type="button"
//                                 onClick={() =>
//                                   toggleSelection('specialOccasion', occasion)
//                                 }
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                                   formData.specialOccasion.includes(occasion)
//                                     ? 'bg-gray-900 text-white'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                               >
//                                 {occasion}
//                               </button>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">
//                             No occasions available
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Dietary Restrictions */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('dietaryRestrictions')}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-medium">
//                       Do you have any dietary restrictions?
//                     </span>
//                     <span className="text-2xl text-gray-500">
//                       {expandedSections.dietaryRestrictions ? '−' : '+'}
//                     </span>
//                   </button>
//                   {expandedSections.dietaryRestrictions && (
//                     <div className="p-4 pt-0 bg-white">
//                       {loadingDietary ? (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">
//                             Loading dietary restrictions...
//                           </p>
//                         </div>
//                       ) : dietaryOptions.length > 0 ? (
//                         <>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {dietaryOptions.map((option) => (
//                               <button
//                                 key={option}
//                                 type="button"
//                                 onClick={() =>
//                                   toggleSelection('dietaryRestrictions', option)
//                                 }
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                                   formData.dietaryRestrictions.includes(option)
//                                     ? 'bg-gray-900 text-white'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                               >
//                                 {option}
//                               </button>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">
//                             No dietary restrictions available
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Party Dietary Restrictions */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('partyDietaryRestrictions')}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-medium">
//                       Does your party have any dietary restrictions?
//                     </span>
//                     <span className="text-2xl text-gray-500">
//                       {expandedSections.partyDietaryRestrictions ? '−' : '+'}
//                     </span>
//                   </button>
//                   {expandedSections.partyDietaryRestrictions && (
//                     <div className="p-4 pt-0 bg-white">
//                       {loadingPartyDietary ? (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">
//                             Loading party dietary restrictions...
//                           </p>
//                         </div>
//                       ) : partyDietaryOptions.length > 0 ? (
//                         <>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {partyDietaryOptions.map((option) => (
//                               <button
//                                 key={option}
//                                 type="button"
//                                 onClick={() =>
//                                   toggleSelection(
//                                     'partyDietaryRestrictions',
//                                     option
//                                   )
//                                 }
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                                   formData.partyDietaryRestrictions.includes(
//                                     option
//                                   )
//                                     ? 'bg-gray-900 text-white'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                               >
//                                 {option}
//                               </button>
//                             ))}
//                           </div>
//                         </>
//                       ) : (
//                         <div className="text-center py-4">
//                           <p className="text-gray-600">
//                             No party dietary restrictions available
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Additional Notes */}
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     type="button"
//                     onClick={() => toggleSection('additionalNotes')}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-medium">
//                       Anything else we should know?
//                     </span>
//                     <span className="text-2xl text-gray-500">
//                       {expandedSections.additionalNotes ? '−' : '+'}
//                     </span>
//                   </button>
//                   {expandedSections.additionalNotes && (
//                     <div className="p-4 pt-0 bg-white">
//                       <textarea
//                         value={formData.additionalNotes}
//                         onChange={(e) =>
//                           handleInputChange('additionalNotes', e.target.value)
//                         }
//                         rows={5}
//                         className="w-full px-4 py-3 rounded-md focus:ring-0 focus:border-transparent resize-none mb-4"
//                         placeholder="Add any special requests or information..."
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Newsletter Checkboxes */}
//               {/* <div className="mt-6 space-y-3">
//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.receiveVenueNews}
//                     onChange={(e) =>
//                       handleInputChange('receiveVenueNews', e.target.checked)
//                     }
//                     className="mt-1 w-4 h-4 cursor-pointer"
//                   />
//                   <span className="text-sm text-gray-700 flex items-center gap-2">
//                     Receive news and offers for this venue
//                     <Info className="w-4 h-4 text-gray-400" />
//                   </span>
//                 </label>
//                 <label className="flex items-start gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={formData.receiveAllNews}
//                     onChange={(e) =>
//                       handleInputChange('receiveAllNews', e.target.checked)
//                     }
//                     className="mt-1 w-4 h-4 cursor-pointer"
//                   />
//                   <span className="text-sm text-gray-700 flex items-center gap-2">
//                     Receive news and offers for all our locations
//                     <Info className="w-4 h-4 text-gray-400" />
//                   </span>
//                 </label>
//               </div> */}

//               {/* Submit Button */}
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className={`w-full mt-6 px-6 py-3 rounded-md font-semibold transition-colors ${
//                   isSubmitting
//                     ? 'bg-gray-400 text-white cursor-not-allowed'
//                     : 'bg-gray-800 text-white hover:bg-gray-900'
//                 }`}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Reservation Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
//               {/* Map Placeholder */}
//               <div className="mb-4 rounded-lg overflow-hidden h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
//                       <div className="w-3 h-3 bg-white rounded-full"></div>
//                     </div>
//                     <p className="text-sm font-medium text-gray-700">
//                       Kings of Maillard
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <h3 className="text-xl font-semibold mb-2">Kings of Maillard</h3>
//               <a
//                 href="#"
//                 className="text-sm text-blue-600 hover:underline mb-4 block"
//               >
//                 View venue map
//               </a>

//               <div className="space-y-3 text-sm">
//                 <div className="flex items-start gap-3">
//                   <Calendar className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       {formattedDate.fullDate}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       {selectedTime} –{' '}
//                       {calculateEndTime(selectedTime, numberOfGuests)}
//                     </p>
//                     <p className="text-gray-600">À la carte</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Users className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
//                   <p className="font-medium text-gray-900">
//                     Party of {numberOfGuests}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInformation;


import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  Calendar,
  Clock,
  Users,
  Info,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from BookingPage
  const bookingData = location.state || {};
  console.log('Booking Data:', bookingData); // Debug log

  const selectedTime = bookingData.selectedTime || '12:30 PM';
  const selectedDate = bookingData.selectedDate;
  const numberOfGuests = bookingData.numberOfGuests || 2;

  // Format date for display - fixed version
  const formatDateForDisplay = () => {
    console.log('Selected Date:', selectedDate); // Debug log

    if (!selectedDate) {
      return {
        dayOfWeek: '',
        month: '',
        day: '',
        year: '',
        fullDate: '',
      };
    }

    // Handle different date formats
    let dateObj;
    if (selectedDate instanceof Date) {
      dateObj = selectedDate;
    } else if (
      selectedDate.day &&
      selectedDate.month !== undefined &&
      selectedDate.year
    ) {
      // If it's our custom date object {day, month, year}
      dateObj = new Date(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );
    } else if (selectedDate.date) {
      // If it's from the Calendar component
      dateObj = new Date(selectedDate.date);
    } else {
      // Fallback to current date
      dateObj = new Date();
    }

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const fullMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const fullDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dayOfWeekIndex = dateObj.getDay();
    const monthIndex = dateObj.getMonth();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return {
      dayOfWeek: daysOfWeek[dayOfWeekIndex],
      month: months[monthIndex],
      day: day.toString(),
      year: year.toString(),
      fullDate: `${fullDays[dayOfWeekIndex]}, ${fullMonths[monthIndex]} ${day}, ${year}`,
    };
  };

  const formattedDate = formatDateForDisplay();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthdayMonth: '',
    birthdayDay: '',
    specialOccasion: [],
    dietaryRestrictions: [],
    partyDietaryRestrictions: [],
    additionalNotes: '',
    receiveVenueNews: true,
    receiveAllNews: true,
    robotCheck: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    specialOccasion: false,
    dietaryRestrictions: false,
    partyDietaryRestrictions: false,
    additionalNotes: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialOccasions, setSpecialOccasions] = useState([]);
  const [loadingOccasions, setLoadingOccasions] = useState(true);
  const [dietaryOptions, setDietaryOptions] = useState([]);
  const [loadingDietary, setLoadingDietary] = useState(true);
  const [partyDietaryOptions, setPartyDietaryOptions] = useState([]);
  const [loadingPartyDietary, setLoadingPartyDietary] = useState(true);

  // Fetch special occasions from API
  useEffect(() => {
    const fetchSpecialOccasions = async () => {
      try {
        setLoadingOccasions(true);
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch(
          'http://13.126.81.242:5001/getAllSpecialOccasions',
          requestOptions
        );
        const result = await response.json();

        if (result.status && Array.isArray(result.occasions)) {
          // Extract just the names from the occasions array
          const occasionNames = result.occasions.map(
            (occasion) => occasion.name
          );
          setSpecialOccasions(occasionNames);
        } else {
          console.error('Invalid API response format:', result);
          setSpecialOccasions([]);
        }
      } catch (error) {
        console.error('Error fetching special occasions:', error);
        setSpecialOccasions([]);
      } finally {
        setLoadingOccasions(false);
      }
    };

    fetchSpecialOccasions();
  }, []);

  // Fetch dietary restrictions from API
  useEffect(() => {
    const fetchDietaryRestrictions = async () => {
      try {
        setLoadingDietary(true);
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch(
          'http://13.126.81.242:5001/getAllDietaryRestrictions',
          requestOptions
        );
        const result = await response.json();

        if (result.status && Array.isArray(result.restrictions)) {
          // Extract just the names from the restrictions array
          const restrictionNames = result.restrictions.map(
            (restriction) => restriction.name
          );
          setDietaryOptions(restrictionNames);
        } else {
          console.error('Invalid API response format:', result);
          setDietaryOptions([]);
        }
      } catch (error) {
        console.error('Error fetching dietary restrictions:', error);
        setDietaryOptions([]);
      } finally {
        setLoadingDietary(false);
      }
    };

    fetchDietaryRestrictions();
  }, []);

  // Fetch party dietary restrictions from API
  useEffect(() => {
    const fetchPartyDietaryRestrictions = async () => {
      try {
        setLoadingPartyDietary(true);
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch(
          'http://13.126.81.242:5001/getAllPartyDietaryRestrictions',
          requestOptions
        );
        const result = await response.json();

        if (result.status && Array.isArray(result.restrictions)) {
          // Extract just the names from the restrictions array
          const restrictionNames = result.restrictions.map(
            (restriction) => restriction.name
          );
          setPartyDietaryOptions(restrictionNames);
        } else {
          console.error('Invalid API response format:', result);
          setPartyDietaryOptions([]);
        }
      } catch (error) {
        console.error('Error fetching party dietary restrictions:', error);
        setPartyDietaryOptions([]);
      } finally {
        setLoadingPartyDietary(false);
      }
    };

    fetchPartyDietaryRestrictions();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Reset form function
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthdayMonth: '',
      birthdayDay: '',
      specialOccasion: [],
      dietaryRestrictions: [],
      partyDietaryRestrictions: [],
      additionalNotes: '',
      receiveVenueNews: true,
      receiveAllNews: true,
      robotCheck: false,
    });
    setExpandedSections({
      specialOccasion: false,
      dietaryRestrictions: false,
      partyDietaryRestrictions: false,
      additionalNotes: false,
    });
  };

  // API Integration function
  const submitBookingToAPI = async (bookingData) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Format date for API (YYYY-MM-DD) - FIXED VERSION
    const formatDateForAPI = (date) => {
      if (!date) {
        const now = new Date();
        return now.toISOString().split('T')[0];
      }

      let dateObj;
      if (date instanceof Date) {
        dateObj = date;
      } else if (date.day && date.month !== undefined && date.year) {
        // If it's our custom date object {day, month, year}
        // Note: month is 0-indexed in JavaScript Date, so we use it as-is
        dateObj = new Date(date.year, date.month, date.day);
      } else if (date.date) {
        // If it's from the Calendar component
        dateObj = new Date(date.date);
      } else {
        // Fallback to current date
        dateObj = new Date();
      }

      // Use local date components to avoid timezone issues
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };

    // Format time for API (remove AM/PM and convert to 24h if needed)
    const formatTimeForAPI = (time) => {
      if (!time) return '12:00';

      // Remove AM/PM and trim whitespace
      const timeWithoutPeriod = time.replace(/[AP]M/i, '').trim();
      return timeWithoutPeriod;
    };

    const raw = JSON.stringify({
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phoneNumber,
      dob: `${bookingData.birthdayMonth || ''}-${
        bookingData.birthdayDay || ''
      }`,
      date: formatDateForAPI(selectedDate),
      time: formatTimeForAPI(selectedTime),
      personCount: numberOfGuests,
      answer1: bookingData.specialOccasion.join(', ') || 'No',
      answer2: bookingData.dietaryRestrictions.join(', ') || 'No',
      answer3: bookingData.partyDietaryRestrictions.join(', ') || 'No',
      answer4: bookingData.additionalNotes || 'No additional notes',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'http://13.126.81.242:5001/TableBooking',
        requestOptions
      );
      const result = await response.json();

      if (result.status) {
        return { success: true, data: result };
      } else {
        return { success: false, error: result.message || 'Booking failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.robotCheck
    ) {
      toast.error('Please fill in all required fields and complete the reCAPTCHA', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          textAlign: 'center',
        },
        className: "toast-center"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiResult = await submitBookingToAPI(formData);

      if (apiResult.success) {
        console.log('Booking submitted successfully:', apiResult.data);
        toast.success('Reservation submitted successfully!', {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            textAlign: 'center',
          },
          className: "toast-center"
        });

        // Reset form fields after successful submission
        resetForm();

        // Navigate to BookingPage (home page) after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Booking failed:', apiResult.error);
        toast.error(`Reservation failed: ${apiResult.error}`, {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            textAlign: 'center',
          },
          className: "toast-center"
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('An error occurred while submitting your reservation. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          textAlign: 'center',
        },
        className: "toast-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEndTime = (startTime, numberOfGuests) => {
    const [time, modifier] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    // Base duration: 1.5 hours for 2 guests
    // Extra 30 mins per additional guest above 2
    const baseMinutes = 90;
    const extraMinutes = numberOfGuests > 2 ? (numberOfGuests - 2) * 30 : 0;
    const totalMinutes = baseMinutes + extraMinutes;

    const endDate = new Date(startDate.getTime() + totalMinutes * 60 * 1000);

    let endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    const endModifier = endHours >= 12 ? 'PM' : 'AM';

    endHours = endHours % 12;
    endHours = endHours ? endHours : 12;

    return `${endHours}:${endMinutes
      .toString()
      .padStart(2, '0')} ${endModifier}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        toastStyle={{
          textAlign: 'center',
          margin: '0 auto',
          minWidth: '300px',
          justifyContent: 'center',
        }}
      />
      
      {/* Add custom CSS for center alignment */}
      <style>
        {`
          .Toastify__toast-container--top-center {
            left: 50%;
            transform: translateX(-50%);
            justify-content: center;
          }
          .Toastify__toast {
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }
        `}
      </style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-serif text-center tracking-wide">
            KINGS OF MAILLARD
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <button
              onClick={handleBackClick}
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
            </button>
            <div className="flex-1 flex items-center justify-center">
              {' '}
              {/* Changed this line */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span>Kings of Maillard</span>
                <span>•</span>
                <span>
                  {formattedDate.dayOfWeek}, {formattedDate.month}{' '}
                  {formattedDate.day}
                </span>
                <span>•</span>
                <span>{selectedTime}</span>
                <span>•</span>
                <span>
                  {numberOfGuests} {numberOfGuests === 1 ? 'guest' : ''}
                </span>
              </div>
            </div>
            <div className="w-6"></div> {/* Added this for balance */}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your information</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Please select an option below to continue checkout:
                </p>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm">Sign in with Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium">
                      LOGIN WITH FACEBOOK
                    </span>
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue as a guest
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-0  focus:border-transparent"
                      />
                      {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 text-xl">
                        ✉
                      </span> */}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm w-21">
                        <option value="+965">🇰🇼 +965</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only digits and limit to 8 characters
                          if (/^\d{0,8}$/.test(value)) {
                            handleInputChange('phoneNumber', value);
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birthday
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="mm"
                        value={formData.birthdayMonth}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (
                            value === '' ||
                            (parseInt(value) >= 1 && parseInt(value) <= 12)
                          ) {
                            handleInputChange('birthdayMonth', value);
                          }
                        }}
                        maxLength={2}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="dd"
                        value={formData.birthdayDay}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          const month = parseInt(formData.birthdayMonth) || 1;

                          // Determine max days based on month
                          let maxDays = 31;
                          if ([4, 6, 9, 11].includes(month)) {
                            maxDays = 30;
                          } else if (month === 2) {
                            maxDays = 29; // Simplified - could add leap year logic
                          }

                          if (
                            value === '' ||
                            (parseInt(value) >= 1 && parseInt(value) <= maxDays)
                          ) {
                            handleInputChange('birthdayDay', value);
                          }
                        }}
                        maxLength={2}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="mb-6">
                <div className="flex items-center gap-3 p-4 border border-gray-300 rounded bg-gray-50 w-fit">
                  <input
                    type="checkbox"
                    checked={formData.robotCheck}
                    onChange={(e) =>
                      handleInputChange('robotCheck', e.target.checked)
                    }
                    className="w-6 h-6"
                  />
                  <span className="text-sm">I'm not a robot</span>
                  <div className="ml-4">
                    <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                      reCAPTCHA
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                If you'd like, tell us more about yourself and your preferences
                so we can provide a better experience.
              </p>

              {/* Expandable Sections */}
              <div className="space-y-4">
                {/* Special Occasion */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('specialOccasion')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">
                      Is this a Special Occasion?
                    </span>
                    <span className="text-2xl text-gray-500">
                      {expandedSections.specialOccasion ? '−' : '+'}
                    </span>
                  </button>
                  {expandedSections.specialOccasion && (
                    <div className="p-4 pt-0 bg-white">
                      {loadingOccasions ? (
                        <div className="text-center py-4">
                          <p className="text-gray-600">Loading occasions...</p>
                        </div>
                      ) : specialOccasions.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {specialOccasions.map((occasion) => (
                              <button
                                key={occasion}
                                type="button"
                                onClick={() =>
                                  toggleSelection('specialOccasion', occasion)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  formData.specialOccasion.includes(occasion)
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {occasion}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            No occasions available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Dietary Restrictions */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('dietaryRestrictions')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">
                      Do you have any dietary restrictions?
                    </span>
                    <span className="text-2xl text-gray-500">
                      {expandedSections.dietaryRestrictions ? '−' : '+'}
                    </span>
                  </button>
                  {expandedSections.dietaryRestrictions && (
                    <div className="p-4 pt-0 bg-white">
                      {loadingDietary ? (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            Loading dietary restrictions...
                          </p>
                        </div>
                      ) : dietaryOptions.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {dietaryOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  toggleSelection('dietaryRestrictions', option)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  formData.dietaryRestrictions.includes(option)
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            No dietary restrictions available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Party Dietary Restrictions */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('partyDietaryRestrictions')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">
                      Does your party have any dietary restrictions?
                    </span>
                    <span className="text-2xl text-gray-500">
                      {expandedSections.partyDietaryRestrictions ? '−' : '+'}
                    </span>
                  </button>
                  {expandedSections.partyDietaryRestrictions && (
                    <div className="p-4 pt-0 bg-white">
                      {loadingPartyDietary ? (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            Loading party dietary restrictions...
                          </p>
                        </div>
                      ) : partyDietaryOptions.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {partyDietaryOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  toggleSelection(
                                    'partyDietaryRestrictions',
                                    option
                                  )
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                  formData.partyDietaryRestrictions.includes(
                                    option
                                  )
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-600">
                            No party dietary restrictions available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection('additionalNotes')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">
                      Anything else we should know?
                    </span>
                    <span className="text-2xl text-gray-500">
                      {expandedSections.additionalNotes ? '−' : '+'}
                    </span>
                  </button>
                  {expandedSections.additionalNotes && (
                    <div className="p-4 pt-0 bg-white">
                      <textarea
                        value={formData.additionalNotes}
                        onChange={(e) =>
                          handleInputChange('additionalNotes', e.target.value)
                        }
                        rows={5}
                        className="w-full px-4 py-3 rounded-md focus:ring-0 focus:border-transparent resize-none mb-4"
                        placeholder="Add any special requests or information..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Newsletter Checkboxes */}
              {/* <div className="mt-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.receiveVenueNews}
                    onChange={(e) =>
                      handleInputChange('receiveVenueNews', e.target.checked)
                    }
                    className="mt-1 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-2">
                    Receive news and offers for this venue
                    <Info className="w-4 h-4 text-gray-400" />
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.receiveAllNews}
                    onChange={(e) =>
                      handleInputChange('receiveAllNews', e.target.checked)
                    }
                    className="mt-1 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-2">
                    Receive news and offers for all our locations
                    <Info className="w-4 h-4 text-gray-400" />
                  </span>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-6 px-6 py-3 rounded-md font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          {/* Right Column - Reservation Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* Map Placeholder */}
              <div className="mb-4 rounded-lg overflow-hidden h-48 bg-gradient-to-br from-blue-100 to-blue-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Kings of Maillard
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">Kings of Maillard</h3>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline mb-4 block"
              >
                View venue map
              </a>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {formattedDate.fullDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedTime} –{' '}
                      {calculateEndTime(selectedTime, numberOfGuests)}
                    </p>
                    <p className="text-gray-600">À la carte</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="font-medium text-gray-900">
                    Party of {numberOfGuests}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;