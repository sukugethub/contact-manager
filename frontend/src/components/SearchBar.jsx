import React, { useState, useEffect } from "react";

// Debounced search input
const SearchBar = ({ onSearch, delay = 300 }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => onSearch(value), delay);
    return () => clearTimeout(id);
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;