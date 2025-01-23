import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Reservation {
  name: string
  email: string
  phone: string
  bookingType: string
  people: number
  date: Date | null
  tables: string[]
  timeSlot: string
  endTime: string
  duration: number
  bookingNumber: string
}

interface StepsCompleted {
  bookingType: boolean
  people: boolean
  date: boolean
  tables: boolean
  timeSlot: boolean
  userInfo: boolean
}

interface ReservationContextType {
  reservation: Reservation
  updateReservation: (newData: Partial<Reservation>) => void
  stepsCompleted: StepsCompleted
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined)

export function useReservation() {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider")
  }
  return context
}

interface ReservationProviderProps {
  children: ReactNode
}

export function ReservationProvider({ children }: ReservationProviderProps) {
  const [reservation, setReservation] = useState<Reservation>({
    name: "",
    email: "",
    phone: "",
    bookingType: "",
    people: 0,
    date: null,
    tables: [],
    timeSlot: "",
    endTime: "",
    duration: 60,
    bookingNumber: "",
  })

  const [stepsCompleted, setStepsCompleted] = useState<StepsCompleted>({
    bookingType: false,
    people: false,
    date: false,
    tables: false,
    timeSlot: false,
    userInfo: false,
  })

  useEffect(() => {
    setStepsCompleted({
      bookingType: !!reservation.bookingType,
      people: reservation.people > 0,
      date: !!reservation.date,
      tables: reservation.tables.length > 0,
      timeSlot: !!reservation.timeSlot,
      userInfo: !!reservation.name && !!reservation.email && !!reservation.phone,
    })
  }, [reservation])

  const updateReservation = (newData: Partial<Reservation>) => {
    setReservation((prev) => ({ ...prev, ...newData }))
  }

  return (
    <ReservationContext.Provider value={{ reservation, updateReservation, stepsCompleted }}>
      {children}
    </ReservationContext.Provider>
  )
}

