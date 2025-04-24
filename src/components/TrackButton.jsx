import { useEffect, useState } from 'react'

function TrackButton({ symbol }) {
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('trackedStocks')
    if (stored) {
      const list = JSON.parse(stored)
      setTracked(list.includes(symbol))
    }
  }, [symbol])

  function toggleTracking() {
    const stored = localStorage.getItem('trackedStocks')
    const list = stored ? JSON.parse(stored) : []

    let updated
    if (list.includes(symbol)) {
      updated = list.filter((s) => s !== symbol)
    } else {
      updated = [...list, symbol]
    }

    localStorage.setItem('trackedStocks', JSON.stringify(updated))
    setTracked(!tracked)
  }

  return (
    <button
      onClick={toggleTracking}
      className={`px-3 py-1 rounded font-medium ${
        tracked ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'
      }`}
    >
      {tracked ? '✓ Tracked' : 'Track'}
    </button>
  )
}

export default TrackButton
