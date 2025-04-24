import { useEffect, useState } from 'react'
import Card from '../components/Card'

export default function Tracked() {
  const [items, setItems] = useState([])
  const [trackedSymbols, setTrackedSymbols] = useState([])

  useEffect(() => {
    // Get tracked stock symbols
    const stored = localStorage.getItem('trackedStocks')
    if (stored) {
      setTrackedSymbols(JSON.parse(stored))
    }

    // Load all stocks from data.json
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
      })
  }, [])

  const filtered = items.filter((item) =>
    trackedSymbols.includes(item.symbol)
  )

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-700">⭐ Tracked Stocks</h1>

      {filtered.length === 0 ? (
        <p className="text-gray-500 italic">No tracked stocks yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((stock, i) => (
            <Card key={i} {...stock} />
          ))}
        </div>
      )}
    </div>
  )
}
