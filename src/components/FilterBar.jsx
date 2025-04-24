function FilterBar({ selected, setSelected, options }) {
  return (
    <div className="flex gap-2 mb-4">
      {['All', ...options].map((tag) => (
        <button
          key={tag}
          onClick={() => setSelected(tag)}
          className={`px-3 py-1 rounded text-sm border ${
            selected === tag
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
