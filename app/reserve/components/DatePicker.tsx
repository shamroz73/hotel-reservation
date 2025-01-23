import type React from "react"
import { useReservation } from "../../contexts/ReservationContext"

interface DatePickerProps {
  onNext: () => void
}

export default function DatePicker({ onNext }: DatePickerProps) {
  const { reservation, updateReservation } = useReservation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value)
    const dayOfWeek = selectedDate.getDay()

    if (reservation.bookingType === "afterwork" && (dayOfWeek === 0 || dayOfWeek === 6)) {
      alert("Afterwork bookings are only available on weekdays.")
      return
    }

    updateReservation({ date: selectedDate })
  }

  const isDateValid =
    reservation.date &&
    (reservation.bookingType !== "afterwork" || (reservation.date.getDay() !== 0 && reservation.date.getDay() !== 6))

  const today = new Date()
  const minDate = today.toISOString().split("T")[0]

  return (
    <div className="space-y-4">
      <label htmlFor="date" className="block mb-1">
        Select Date
      </label>
      <input
        type="date"
        id="date"
        value={reservation.date ? reservation.date.toISOString().split("T")[0] : ""}
        onChange={handleChange}
        min={minDate}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        onClick={onNext}
        className={`w-full px-4 py-2 rounded ${
          isDateValid ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isDateValid}
      >
        Next
      </button>
    </div>
  )
}

