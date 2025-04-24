import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-700">
        📈 Market Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-500 italic">Loading stocks...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
