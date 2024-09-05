import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Logo from '../assets/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex items-center justify-between bg-green-300">
       {/* <button
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
      </button> */}
      
      <div>
      <Image 
        src="/images/logo.png" 
        alt="" 
        width={100} 
        height={0} 
        className=''
      />
      </div>

        <nav 
        // className={`fixed inset-y-0 left-50 transform ${
        //   isOpen ? "translate-y-0" : "-translate-y-full"
        // } transition-transform duration-200 ease-in-out w-64 z-20 md:relative md:translate-x-0`}
      >
          <ul className='flex justify-around items-center text-green-600'>
            <li className="m-5">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li className="m-5">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li className="m-5">
              <Link href="/contact" className="hover:text-white">
                Contact
                </Link>
              </li>
            <li className="m-5">
              <Link href="/faq" className="hover:text-white">
                FAQ
              
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    // </div>
  );
};

export default Sidebar;