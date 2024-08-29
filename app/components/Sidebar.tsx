import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen">
      <button
        className="md:hidden fixed top-4 left-4 z-10 bg-green-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-gray-800 text-white w-64 z-20 md:relative md:translate-x-0`}
      >
        <nav >
          <ul>
            <li className="mb-4">
              <Link href="/" className="hover:text-green-300">
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/about" className="hover:text-green-300">
                About
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/contact" className="hover:text-green-300">
                Contact
                </Link>
              </li>
            <li className="mb-4">
              <Link href="/faq" className="hover:text-green-300">
                FAQ
              
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;