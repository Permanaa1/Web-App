// src/components/common/SearchBar.jsx
import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Cari resep makanan...' }) {
  return (
    <div className="max-w-3xl mx-auto">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </span>
      </label>
    </div>
  );
}
