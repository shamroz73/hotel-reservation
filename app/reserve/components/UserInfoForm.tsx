import type React from "react"
import { useState } from "react"
import { useReservation } from "../../contexts/ReservationContext"

interface UserInfoFormProps {
  onNext: () => void
}

export default function UserInfoForm({ onNext }: UserInfoFormProps) {
  const { reservation, updateReservation } = useReservation()
  const [name, setName] = useState(reservation.name)
  const [email, setEmail] = useState(reservation.email)
  const [phone, setPhone] = useState(reservation.phone)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateReservation({ name, email, phone })
    onNext()
  }

  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 rounded ${
          isFormValid ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        Complete Reservation
      </button>
    </form>
  )
}

