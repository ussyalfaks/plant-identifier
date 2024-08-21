import React from 'react'
import Link from 'next/link'

 const footer = () => {
  return (
    <div>
         {/* Footer */}
      <footer className="bg-green-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Plant Identifier. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:text-green-300 mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-300">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default footer