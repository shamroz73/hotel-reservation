import React from "react"
import { useReservation } from "../../contexts/ReservationContext"

export default function ConfirmationMessage() {
  const { reservation } = useReservation()

  return (
    <div className="text-center bg-green-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        {reservation.status === "booked" ? "Your table has been reserved!" : "Your reservation has been updated!"}
      </h2>
      <div className="text-left max-w-md mx-auto">
        <p>
          <strong>Booking Number:</strong> {reservation.bookingNumber}
        </p>
        <p>
          <strong>Status:</strong> {reservation.status}
        </p>
        <p>
          <strong>Name:</strong> {reservation.name}
        </p>
        <p>
          <strong>Email:</strong> {reservation.email}
        </p>
        <p>
          <strong>Phone:</strong> {reservation.phone}
        </p>
        <p>
          <strong>Booking Type:</strong> {reservation.bookingType}
        </p>
        <p>
          <strong>Number of People:</strong> {reservation.people}
        </p>
        <p>
          <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {reservation.timeSlot} - {reservation.endTime} ({reservation.duration} minutes)
        </p>
        <p>
          <strong>Table(s):</strong> {reservation.tables.join(", ")}
        </p>
      </div>
      <p className="mt-4">Thank you for your reservation. We look forward to seeing you!</p>
      <p className="mt-2 text-sm">Please keep your booking number for future reference or modifications.</p>
    </div>
  )
}

