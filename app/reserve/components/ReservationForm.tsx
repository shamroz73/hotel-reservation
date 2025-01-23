import React, { useState } from "react"
import { useReservation } from "../../contexts/ReservationContext"
import ReservationTabs from "./ReservationTabs"
import HomeTab from "./HomeTab"
import BookingTypeDropdown from "./BookingTypeDropdown"
import PeopleCounter from "./PeopleCounter"
import DatePicker from "./DatePicker"
import TableSelection from "./TableSelection"
import TimeSlotSelection from "./TimeSlotSelection"
import UserInfoForm from "./UserInfoForm"

interface ReservationFormProps {
  onReserve: (reservation: any) => void
  onUpdate: (reservation: any) => void
}

export default function ReservationForm({ onReserve, onUpdate }: ReservationFormProps) {
  const { reservation, stepsCompleted } = useReservation()
  const [step, setStep] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [isBookingTypeActive, setIsBookingTypeActive] = useState(false)

  const handleTabClick = (newStep: number) => {
    if (newStep <= getMaxAllowedStep()) {
      setStep(newStep)
    }
  }

  const getMaxAllowedStep = () => {
    if (!stepsCompleted.bookingType) return 2
    if (!stepsCompleted.people) return 3
    if (!stepsCompleted.date) return 4
    if (!stepsCompleted.tables) return 5
    if (!stepsCompleted.timeSlot) return 6
    if (!stepsCompleted.userInfo) return 7
    return 7
  }

  const renderReservationSummary = () => {
    if (step === 1) return null
    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <h2 className="font-semibold mb-2">Reservation Summary</h2>
        {reservation.bookingType && <p>Type: {reservation.bookingType}</p>}
        {reservation.people > 0 && <p>Persons: {reservation.people}</p>}
        {reservation.date && <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>}
        {reservation.timeSlot && (
          <p>
            Time: {reservation.timeSlot} - {reservation.endTime}
          </p>
        )}
        {reservation.tables.length > 0 && <p>Table: {reservation.tables.join(", ")}</p>}
      </div>
    )
  }

  const handleEdit = (bookingNumber: string) => {
    setIsEditing(true)
    setIsBookingTypeActive(true)
    setStep(2)
  }

  const handleNewReservation = () => {
    setIsBookingTypeActive(true)
    setStep(2)
  }

  const handleComplete = () => {
    if (isEditing) {
      onUpdate(reservation)
    } else {
      onReserve(reservation)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ReservationTabs currentStep={step} onTabClick={handleTabClick} maxAllowedStep={getMaxAllowedStep()} />
      {renderReservationSummary()}
      {step === 1 && <HomeTab onNext={handleNewReservation} onEdit={handleEdit} />}
      {step === 2 && <BookingTypeDropdown onNext={() => setStep(3)} isActive={isBookingTypeActive} />}
      {step === 3 && <PeopleCounter onNext={() => setStep(4)} />}
      {step === 4 && <DatePicker onNext={() => setStep(5)} />}
      {step === 5 && <TableSelection onNext={() => setStep(6)} />}
      {step === 6 && <TimeSlotSelection onNext={() => setStep(7)} />}
      {step === 7 && <UserInfoForm onNext={handleComplete} />}
    </div>
  )
}

