'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

/**
 * Header Component - Navigation bar with search functionality
 */
export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false); // State to control mobile search visibility

  /**
   * Handles search form submission and redirects to search results.
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) router.push(`/?search=${query}`);
  };

  return (
    <header className="border border-zinc-300 rounded-lg bg-slate-200 p-6 mb-4 shadow-xl">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="uppercase text-2xl font-semibold px-3 py-1 rounded-md transition-all duration-300 bg-cyan-500 text-white hover:scale-105 shadow-md"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="uppercase text-2xl font-semibold px-3 py-1 rounded-lg transition-all duration-300 bg-green-700 text-white hover:scale-105 shadow-md"
          >
            Create
          </Link>
        </div>

        {/* Mobile Search Toggle Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <FaSearch />
        </button>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search tasks..."
            className="px-2 py-1 rounded-md text-black focus:outline-none focus:ring-2 hover:ring-2 hover:ring-blue-400 shadow-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-2xl font-medium text-white px-4 py-1 rounded-md hover:bg-blue-800 transition-colors duration-200 shadow-md"
          >
            Search
          </button>
        </form>
      </nav>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden flex justify-center p-4 bg-blue-500 text-white shadow-lg mt-5">
          <form onSubmit={handleSearch} className="flex gap-2 w-full px-4">
            <input
              type="text"
              name="search"
              placeholder="Search tasks..."
              className="flex-1 px-2 py-1 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-700 px-4 py-1 rounded hover:bg-blue-800 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
