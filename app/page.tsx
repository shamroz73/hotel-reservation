import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Hotel</h1>
      <Link href="/reserve" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 inline-block">
        Reserve a Table
      </Link>
    </div>
  )
}

