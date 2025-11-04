import React, { useState } from "react";
import { FiX } from "react-icons/fi";

function SearchModal({ onClose }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // Your client-side filter logic here
    console.log("Search for:", search);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl hover:text-gray-500"
        >
          <FiX />
        </button>
        <h2 className="text-xl font-bold mb-4">Search Blogs</h2>
        <input
          type="text"
          placeholder="Search by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchModal;
