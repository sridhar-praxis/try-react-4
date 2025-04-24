import React from 'react'
import { Link } from 'react-router-dom'
import TrackButton from './TrackButton'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

function Card({ title, subtitle, tag, change, symbol }) {
  const dummyData = [
    { price: 100 },
    { price: 120 },
    { price: 130 },
    { price: 110 },
    { price: 125 },
    { price: 135 },
  ]
  return (
    <div className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition-shadow duration-300 space-y-2">
      <Link to={`/stock/${symbol}`} className="block">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </Link>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={dummyData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {tag && (
        <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
          {tag}
        </span>
      )}

      {change !== undefined && (
        <p
          className={`text-sm font-medium ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change > 0 ? '▲' : '▼'} {Math.abs(change)}%
        </p>
      )}
      <TrackButton symbol={symbol} />
    </div>
  )
}

export default Card
