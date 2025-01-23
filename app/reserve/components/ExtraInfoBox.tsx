import React from "react"
import { useReservation } from "../../contexts/ReservationContext"

export default function ExtraInfoBox() {
  const { reservation, updateReservation } = useReservation()

  return (
    <div className="space-y-4">
      <label htmlFor="extraInfo" className="block mb-1">
        Additional Information (Optional)
      </label>
      <textarea
        id="extraInfo"
        onChange={(e) => updateReservation({ extraInfo: e.target.value })}
        className="w-full px-3 py-2 border rounded"
        rows={4}
        value={reservation.extraInfo}
      />
    </div>
  )
}

