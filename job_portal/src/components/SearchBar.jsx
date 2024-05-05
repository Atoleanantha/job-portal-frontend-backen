import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Pass the search term to the parent component or perform a search action
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    // Trigger search on Enter key press
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{textAlign:"center"}}>
        <div className="search-bar-container">
      <input className='search-bar-input'
        type="text"
        placeholder="Search your jobs here..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className='search-btn' onClick={handleSearch}>Search Jobs</button>
    </div>
    </div>
    
  );
};

export default SearchBar;
