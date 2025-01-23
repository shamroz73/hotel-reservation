import type React from "react"
import { useState } from "react"
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useReservation } from "../../contexts/ReservationContext"

interface HomeTabProps {
  onNext: () => void
  onEdit: (bookingNumber: string) => void
}

export default function HomeTab({ onNext, onEdit }: HomeTabProps) {
  const [bookingNumber, setBookingNumber] = useState("")
  const [searchResult, setSearchResult] = useState<any | null>(null)
  const [message, setMessage] = useState("")
  const { updateReservation } = useReservation()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setSearchResult(null)

    try {
      const reservationsRef = collection(db, "reservations")
      const q = query(reservationsRef, where("bookingNumber", "==", bookingNumber))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setMessage("No reservation found with this booking number.")
        return
      }

      const reservationData = querySnapshot.docs[0].data()
      setSearchResult(reservationData)
    } catch (error) {
      console.error("Error searching reservation: ", error)
      setMessage("An error occurred while searching for the reservation. Please try again.")
    }
  }

  const handleCancelReservation = async () => {
    try {
      const reservationsRef = collection(db, "reservations")
      const q = query(reservationsRef, where("bookingNumber", "==", bookingNumber))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setMessage("No reservation found with this booking number.")
        return
      }

      const docToUpdate = querySnapshot.docs[0]
      await updateDoc(docToUpdate.ref, { status: "cancelled" })
      setMessage("Reservation successfully cancelled.")
      setBookingNumber("")
      setSearchResult(null)
    } catch (error) {
      console.error("Error cancelling reservation: ", error)
      setMessage("An error occurred while cancelling the reservation. Please try again.")
    }
  }

  const handleEdit = () => {
    updateReservation(searchResult)
    onEdit(bookingNumber)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Reservation</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="bookingNumber" className="block text-sm font-medium text-gray-700">
            Booking Number
          </label>
          <input
            type="text"
            id="bookingNumber"
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
          Search
        </button>
      </form>

      {searchResult && (
        <div className="space-y-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Reservation Found</h3>
          <p>Status: {searchResult.status}</p>
          <p>Date: {new Date(searchResult.date).toLocaleDateString()}</p>
          <p>Time: {searchResult.timeSlot}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="flex-1 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Edit Reservation
            </button>
            <button
              onClick={handleCancelReservation}
              className="flex-1 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Cancel Reservation
            </button>
          </div>
        </div>
      )}

      {message && <p className="text-center font-semibold text-red-500">{message}</p>}

      <button onClick={onNext} className="w-full px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
        Make a New Reservation
      </button>
    </div>
  )
}

