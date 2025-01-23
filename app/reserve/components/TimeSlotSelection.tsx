import React, { useState } from "react"
import { Clock } from "lucide-react"
import { useReservation } from "../../contexts/ReservationContext"

interface TimeSlotSelectionProps {
  onNext: () => void
}

const weekdaySlots = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]
const weekendSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

const durations = [
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
  { label: "2 hours", value: 120 },
]

export default function TimeSlotSelection({ onNext }: TimeSlotSelectionProps) {
  const { reservation, updateReservation } = useReservation()
  const [selectedDuration, setSelectedDuration] = useState(60)

  const isWeekend = reservation.date && (reservation.date.getDay() === 0 || reservation.date.getDay() === 6)
  const slots = isWeekend ? weekendSlots : weekdaySlots

  const handleSelect = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const startDate = new Date(reservation.date!)
    startDate.setHours(hours, minutes, 0, 0)

    const endDate = new Date(startDate.getTime() + selectedDuration * 60000)
    const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`

    updateReservation({
      timeSlot: startTime,
      endTime: endTime,
      duration: selectedDuration,
    })
  }

  const isSlotAvailable = (slot: string) => {
    const [hours, minutes] = slot.split(":").map(Number)
    const startDate = new Date(reservation.date!)
    startDate.setHours(hours, minutes, 0, 0)
    const endDate = new Date(startDate.getTime() + selectedDuration * 60000)

    const slotEndTime = slots[slots.indexOf(slot) + selectedDuration / 30]
    return slotEndTime !== undefined
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Time Slot and Duration</h2>
      <div className="space-y-2">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration
        </label>
        <select
          id="duration"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {durations.map((duration) => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-4">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSelect(slot)}
            disabled={!isSlotAvailable(slot)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded 
              ${reservation.timeSlot === slot ? "bg-blue-200" : "hover:bg-blue-100"}
              ${!isSlotAvailable(slot) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Clock size={16} />
            <span>{slot}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        className={`w-full px-4 py-2 rounded ${
          reservation.timeSlot
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!reservation.timeSlot}
      >
        Next
      </button>
    </div>
  )
}

