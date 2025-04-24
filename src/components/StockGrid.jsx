import Card from './Card'

function StockGrid({ items }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  )
}

export default StockGrid
