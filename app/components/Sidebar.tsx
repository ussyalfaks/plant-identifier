import React from 'react'
import Link from 'next/link'


const sidebar = () => {
  return (
        
    // <div className=''>
      <aside className=" bg-green-800 text-white p-6 hidden md:block">
      <nav>
        <ul>
          <li className="mb-4"><Link href="/" className="hover:text-green-300">Home</Link></li>
          <li className="mb-4"><Link href="/about" className="hover:text-green-300">About</Link></li>
          <li className="mb-4"><Link href="/contact" className="hover:text-green-300">Contact</Link></li>
          <li className="mb-4"><Link href="/faq" className="hover:text-green-300">FAQ</Link></li>
        </ul>
      </nav>
    </aside>
    // </div>
   
  )
}

export default sidebar

