import { useParams, useNavigate } from 'react-router-dom'
import data from '../../public/data.json'

export default function StockDetail() {
  const { symbol } = useParams()
  const navigate = useNavigate()

  const stock = data.find((item) => item.symbol === symbol)

  if (!stock) return <p className="text-red-500">Stock not found</p>

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold">{stock.title}</h1>
      <p className="text-gray-500">{stock.subtitle}</p>
      <p className="mt-2 text-lg">
        Price: ₹{stock.price} <br />
        Sector: {stock.tag}
      </p>
      <p className="mt-2 text-sm text-gray-600">Symbol: {stock.symbol}</p>
    </div>
  )
}
