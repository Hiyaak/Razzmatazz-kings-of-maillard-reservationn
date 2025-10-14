import React, { useState, useRef, useEffect } from 'react';
export function Control({ label, children }) {
  return (
    <div className="rounded-lg p-3">
      <div className="text-sm text-gray-700 mb-1 font-medium">{label}</div>
      <div>{children}</div>
    </div>
  );
}
export default function Controls({ guests, setGuests }) {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestRef = useRef(null);
  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setGuestsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="mb-6">
      {/* Guests Dropdown */}
      <div className="relative" ref={guestRef}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Guests
        </label>
        <button
          type="button"
          onClick={() => setGuestsOpen((prev) => !prev)}
          aria-expanded={guestsOpen}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex-1">
            <div className="text-base font-medium text-gray-900">
              {guests} {guests === 1 ? 'guest' : ''}
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ml-2 ${
              guestsOpen ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.11 1.01l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {guestsOpen && (
          <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden">
            <div className="max-h-48 overflow-auto py-1">
              {Array.from({ length: 20 }, (_, i) => {
                const val = i + 1;
                return (
                  <div
                    key={val}
                    className={`py-2.5 px-4 cursor-pointer transition-colors ${
                      val === guests
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setGuests(val);
                      setGuestsOpen(false);
                    }}
                  >
                    {val} {val === 1 ? '' : ''}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
