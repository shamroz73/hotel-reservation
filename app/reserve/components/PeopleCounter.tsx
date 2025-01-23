import React from "react"
import { useReservation } from "../../contexts/ReservationContext"

interface PeopleCounterProps {
  onNext: () => void
}

export default function PeopleCounter({ onNext }: PeopleCounterProps) {
  const { reservation, updateReservation } = useReservation()

  const handleChange = (newCount: number) => {
    updateReservation({ people: newCount })
  }

  return (
    <div className="space-y-4">
      <label htmlFor="peopleCount" className="block mb-1">
        Number of People
      </label>
      <div className="flex items-center space-x-4">
        <button onClick={() => handleChange(Math.max(1, reservation.people - 1))} className="px-3 py-1 border rounded">
          -
        </button>
        <span>{reservation.people}</span>
        <button onClick={() => handleChange(reservation.people + 1)} className="px-3 py-1 border rounded">
          +
        </button>
      </div>
      <button
        onClick={onNext}
        className={`w-full px-4 py-2 rounded ${
          reservation.people > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={reservation.people === 0}
      >
        Next
      </button>
    </div>
  )
}

