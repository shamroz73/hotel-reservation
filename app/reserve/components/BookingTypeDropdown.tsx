import React from "react"
import { useReservation } from "../../contexts/ReservationContext"

interface BookingTypeDropdownProps {
  onNext: () => void
  isActive: boolean
}

export default function BookingTypeDropdown({ onNext, isActive }: BookingTypeDropdownProps) {
  const { reservation, updateReservation } = useReservation()

  const handleSelect = (type: string) => {
    updateReservation({ bookingType: type })
  }

  return (
    <div className="space-y-4">
      <label htmlFor="bookingType" className="block text-sm font-medium text-gray-700">
        Booking Type
      </label>
      <select
        id="bookingType"
        onChange={(e) => handleSelect(e.target.value)}
        value={reservation.bookingType}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        disabled={!isActive}
      >
        <option value="">Select a booking type</option>
        <option value="afterwork">Afterwork</option>
        <option value="dinner">Dinner</option>
        <option value="outdoordiner">Outdoor Diner</option>
      </select>
      <button
        onClick={onNext}
        className={`w-full px-4 py-2 rounded ${
          reservation.bookingType && isActive
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!reservation.bookingType || !isActive}
      >
        Next
      </button>
    </div>
  )
}

