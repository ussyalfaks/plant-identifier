import React from 'react'
import { FaLeaf, FaCamera, FaUpload, FaInfoCircle } from 'react-icons/fa'

 const card = () => {
  return (
    <div>
         {/* How to use cards */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-8 ">
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <FaUpload className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
                <p className="text-center">Choose a clear image of the plant you want to identify.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <FaCamera className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Take a Photo</h3>
                <p className="text-center">Use your devices camera to capture a photo of the plant.</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <FaLeaf className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-center">Our AI will analyze the image and provide plant details.</p>
              </div>
            </div>
    </div>
  )
}
export default card