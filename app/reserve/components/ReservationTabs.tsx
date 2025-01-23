import { Home, Users, Calendar, ClipboardList, Clock, Table, User } from "lucide-react"

interface TabProps {
  currentStep: number
  onTabClick: (step: number) => void
  maxAllowedStep: number
}

const tabs = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Booking Type" },
  { icon: ClipboardList, label: "People" },
  { icon: Calendar, label: "Date" },
  { icon: Table, label: "Table" },
  { icon: Clock, label: "Time" },
  { icon: User, label: "User Info" },
]

export default function ReservationTabs({ currentStep, onTabClick, maxAllowedStep }: TabProps) {
  return (
    <div className="flex justify-between mb-8">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`flex flex-col items-center p-2 ${
            currentStep === index + 1 ? "text-blue-500" : "text-gray-500"
          } ${index + 1 <= maxAllowedStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
          onClick={() => index + 1 <= maxAllowedStep && onTabClick(index + 1)}
          disabled={index + 1 > maxAllowedStep}
        >
          <tab.icon size={24} />
          <span className="mt-1 text-xs">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

