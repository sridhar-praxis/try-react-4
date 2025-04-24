import { useEffect, useState } from 'react'
import Card from './components/Card'
import FilterBar from './components/FilterBar'
import SearchBox from './components/SearchBox'
import StockGrid from './components/StockGrid'
import StockDetail from './pages/StockDetail'
import { Routes, Route, Link } from 'react-router-dom'
import Tracked from './pages/Tracked'

import Home from './pages/Home'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setLoading(false)
      })
  }, [])

  /* search is on title and subtitle. so start typing R, Reliance and IT Services is used */
  /* search is on includes(), if changed to .startsWith() then only R will work */

  const uniqueTags = [...new Set(items.map((item) => item.tag).filter(Boolean))]
  // 🧠 combine both filters: tag + search
  const filteredItems = items.filter((item) => {
    const matchesTag = selectedTag === 'All' || item.tag === selectedTag
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase())

    return matchesTag && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    return (b.change || 0) - (a.change || 0)
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      {/* Navigation bar */}
      <nav className="flex gap-4 mb-4 text-blue-600 underline">
        <Link to="/">Home</Link>
        <Link to="/tracked">Tracked</Link>
      </nav>

      <Routes>
        <Route path="/tracked" element={<Tracked />} />

        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 p-6 space-y-4">
              <h1 className="text-2xl font-bold text-indigo-700">
                📈 Market Dashboard
              </h1>

              {!loading && (
                <>
                  <SearchBox value={search} onChange={setSearch} />
                  <FilterBar
                    selected={selectedTag}
                    setSelected={setSelectedTag}
                    options={uniqueTags}
                  />
                </>
              )}

              {loading ? (
                <p className="text-gray-500 italic">Loading stocks...</p>
              ) : filteredItems.length === 0 ? (
                <p className="text-gray-500 italic">
                  No matching stocks found.
                </p>
              ) : (
                <StockGrid items={sortedItems} />
              )}
            </div>
          }
        />

        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
    </div>
  )
}
export default App
