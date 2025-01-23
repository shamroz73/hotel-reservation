"use client"

import React, { useState } from "react"
import { collection, addDoc, updateDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"
import { ReservationProvider } from "../contexts/ReservationContext"
import ReservationForm from "./components/ReservationForm"
import ConfirmationMessage from "./components/ConfirmationMessage"

function generateBookingNumber() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const digits = "0123456789"
  let result = ""
  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  for (let i = 0; i < 6; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return result
}

export default function ReservationPage() {
  const [isReserved, setIsReserved] = useState(false)

  const handleReservation = async (reservation: any) => {
    try {
      const bookingNumber = generateBookingNumber()
      const docRef = await addDoc(collection(db, "reservations"), {
        ...reservation,
        date: reservation.date.toISOString(),
        createdAt: new Date(),
        bookingNumber: bookingNumber,
        status: "booked",
      })
      console.log("Reservation added with ID: ", docRef.id)
      setIsReserved(true)
    } catch (error) {
      console.error("Error adding reservation: ", error)
      alert("An error occurred while making the reservation. Please try again.")
    }
  }

  const handleUpdate = async (reservation: any) => {
    try {
      const reservationsRef = collection(db, "reservations")
      const q = query(reservationsRef, where("bookingNumber", "==", reservation.bookingNumber))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        alert("No reservation found with this booking number.")
        return
      }

      const docToUpdate = querySnapshot.docs[0]
      await updateDoc(docToUpdate.ref, {
        ...reservation,
        date: reservation.date.toISOString(),
        updatedAt: new Date(),
      })
      console.log("Reservation updated successfully")
      setIsReserved(true)
    } catch (error) {
      console.error("Error updating reservation: ", error)
      alert("An error occurred while updating the reservation. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reserve a Table</h1>
          <ReservationProvider>
            {!isReserved ? (
              <ReservationForm onReserve={handleReservation} onUpdate={handleUpdate} />
            ) : (
              <ConfirmationMessage />
            )}
          </ReservationProvider>
        </div>
      </div>
    </div>
  )
}

