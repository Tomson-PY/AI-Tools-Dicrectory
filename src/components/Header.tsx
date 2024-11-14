import React from 'react';
import { BookmarkIcon, Moon, Search } from 'lucide-react';
import { useStore } from '../store';

export const Header = () => {
  const { isAdmin, setIsAdmin } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ottomator Tools List
            </h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Full List</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">AI Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">AI Tutorials</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-3 py-1 rounded-md ${
                isAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              {isAdmin ? 'Admin Mode' : 'User Mode'}
            </button>
            <BookmarkIcon className="h-5 w-5 text-gray-600" />
            <Moon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};