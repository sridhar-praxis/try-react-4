function SearchBox({ value, onChange }) {
    return (
      <input
        type="text"
        placeholder="Search stocks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded text-sm text-gray-700 mb-4"
      />
    )
  }
  
  export default SearchBox
  