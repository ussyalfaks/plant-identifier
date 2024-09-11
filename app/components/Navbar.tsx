// 


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 768) {
            setMenuOpen(false);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    //   scroll no

    useEffect(() => {
        if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isMenuOpen]);
    
  return (
    <>
    <div className={`flex justify-between   max-md:justify-between  bg-green-300   ${isMenuOpen ? '' : 'items-center'}`}>
        <div className=''>
        <Image 
        src="/images/logo.png" 
        alt="" 
        width={100} 
        height={0} 
        className=''
      />           
       </div>
       
    <nav  className={` ${isMenuOpen ? 'flex  justify-center items-center h-screen' : 'mt-3 mx-3'}`}>
     <ul className= {`flex   text-green-600 font-semibold ${isMenuOpen ? '  max-md:flex-col' : 'max-md:hidden'}`}>
     <li className="mx-8 max-md:my-5">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li className="mx-8 max-md:my-5">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li className="mx-8 max-md:my-5">
              <Link href="/contact" className="hover:text-white">
                Contact
                </Link>
              </li>
            <li className="mx-8 max-md:my-5">
              <Link href="/faq" className="hover:text-white">
                FAQ
              
              </Link>
            </li>
      </ul>
    </nav>

    <div className='md:hidden'>
        <button onClick={toggleMenu} className={`text-white bg-green-800 p-2 rounded-md ${isMenuOpen ? 'mt-11 mx-3' :' mt-3 mx-3'} `}>
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
      </div>
  </div>
    </>
  )
}

export default Navbar


// import Link from 'next/link';
// import Image from 'next/image';


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className=" flex items-center justify-between bg-green-300">
      
      
//       <div>
//       <Image 
//         src="/images/logo.png" 
//         alt="" 
//         width={100} 
//         height={0} 
//         className=''
//       />
//       </div>

//         <nav 
//          className={`fixed inset-y-0 left-50 transform ${
//           isOpen ? "translate-y-0 w-full z-10" : "-translate-y-full w-64"
//         } transition-transform duration-200 ease-in-out w-64 z-20 md:relative md:translate-x-0`}
//       >
//           <ul className={`flex justify-around items-center text-green-600 ${
//           isOpen ? " flex flex-col bg-slate-100" : ""
//         }`}>
//             <li className="m-5">
//               <Link href="/" className="hover:text-white">
//                 Home
//               </Link>
//             </li>
//             <li className="m-5">
//               <Link href="/about" className="hover:text-white">
//                 About
//               </Link>
//             </li>
//             <li className="m-5">
//               <Link href="/contact" className="hover:text-white">
//                 Contact
//                 </Link>
//               </li>
//             <li className="m-5">
//               <Link href="/faq" className="hover:text-white">
//                 FAQ
              
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <button
//         className="md:hidden z-30 bg-green-800 text-white p-2 rounded-md"
//         onClick={toggleNavbar}
//       >
//         <svg
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16M4 18h16"
//           />
//         </svg>
//       </button>
//       </div>
//     // </div>
//   );
// };

// export default Navbar;

