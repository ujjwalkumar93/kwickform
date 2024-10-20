"use client";
import { useState } from "react";
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-bold text-blue-500">
        QwickForm
        </div>
        <div className="flex-grow flex justify-center">
          <div className="relative w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
          </div>

          {/* User Profile Icon */}
          <div className="cursor-pointer">
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
