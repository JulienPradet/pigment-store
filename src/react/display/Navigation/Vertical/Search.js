import React from 'react'

const Search = ({search, onChange}) => {
  return <div>
    <input type='text' value={search} onChange={(e) => onChange(e.target.value)} placeholder='Search...' />
    <button onClick={() => onChange('')}>reset</button>
  </div>
}

export default Search
