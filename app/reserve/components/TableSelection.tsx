import React, { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useReservation } from "../../contexts/ReservationContext"

interface Table {
  id: string
  capacity: number
}

interface TableSelectionProps {
  onNext: () => void
}

export default function TableSelection({ onNext }: TableSelectionProps) {
  const { reservation, updateReservation } = useReservation()
  const [tables, setTables] = useState<Table[]>([])
  const [availableTables, setAvailableTables] = useState<Table[]>([])

  useEffect(() => {
    const fetchTables = async () => {
      const tablesRef = collection(db, "tables")
      const tablesSnapshot = await getDocs(tablesRef)
      const tablesData = tablesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Table)
      setTables(tablesData)

      if (reservation.date && reservation.timeSlot && reservation.endTime) {
        // Fetch reservations for the selected date
        const reservationsRef = collection(db, "reservations")
        const reservationsQuery = query(reservationsRef, where("date", "==", reservation.date))
        const reservationsSnapshot = await getDocs(reservationsQuery)
        const reservations = reservationsSnapshot.docs.map((doc) => doc.data())

        // Filter out tables that are not available for the selected time range
        const availableTables = tablesData.filter((table) => {
          return !reservations.some(
            (res) =>
              res.tables.includes(table.id) &&
              ((res.timeSlot >= reservation.timeSlot && res.timeSlot < reservation.endTime) ||
                (res.endTime > reservation.timeSlot && res.endTime <= reservation.endTime) ||
                (res.timeSlot <= reservation.timeSlot && res.endTime >= reservation.endTime)),
          )
        })
        setAvailableTables(availableTables)
      } else {
        setAvailableTables(tablesData)
      }
    }

    fetchTables()
  }, [reservation.date, reservation.timeSlot, reservation.endTime])

  const handleTableSelect = (tableId: string) => {
    const newSelection = reservation.tables.includes(tableId)
      ? reservation.tables.filter((id) => id !== tableId)
      : [...reservation.tables, tableId]

    updateReservation({ tables: newSelection })
  }

  const totalCapacity = reservation.tables.reduce((sum, tableId) => {
    const table = tables.find((t) => t.id === tableId)
    return sum + (table?.capacity || 0)
  }, 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Tables</h2>
      <p>
        People: {reservation.people}, Selected Capacity: {totalCapacity}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {availableTables.map((table) => (
          <button
            key={table.id}
            onClick={() => handleTableSelect(table.id)}
            className={`p-4 border rounded ${reservation.tables.includes(table.id) ? "bg-blue-200" : ""}`}
          >
            Table {table.id} (Capacity: {table.capacity})
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        className={`w-full px-4 py-2 rounded ${
          reservation.tables.length > 0 && totalCapacity >= reservation.people
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={reservation.tables.length === 0 || totalCapacity < reservation.people}
      >
        Next
      </button>
    </div>
  )
}

