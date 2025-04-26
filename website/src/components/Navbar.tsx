// src/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

// Simple SVG User Icon Component (Can be moved to its own file later if needed)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="w-full max-w-6xl py-4 flex justify-between items-center px-2 mb-10 md:mb-16 border-b border-gray-200 dark:border-gray-700">
      <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        Untangle
      </Link>
      <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <UserIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
