// components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchTermChange }) => (
    <div className="mb-6">
        <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
        />
    </div>
);

export default SearchBar;