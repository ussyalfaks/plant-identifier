'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { identifyPlant } from '../utils/plantIdentifier'
import { FaLeaf, FaCamera, FaUpload, FaInfoCircle } from 'react-icons/fa'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File is too large. Please choose an image smaller than 4MB.');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access the camera. Please make sure you have granted the necessary permissions.');
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setShowCamera(false);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleSubmit = async () => {
    if (image) {
      setLoading(true)
      try {
        const identification = await identifyPlant(image)
        setResult(JSON.parse(identification))
      } catch (error) {
        console.error('Error identifying plant:', error)
        setResult({ error: 'Error identifying plant. Please try again.' })
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-green-800 text-white p-6 hidden md:block">
          <nav>
            <ul>
              <li className="mb-4"><Link href="/" className="hover:text-green-300">Home</Link></li>
              <li className="mb-4"><Link href="/about" className="hover:text-green-300">About</Link></li>
              <li className="mb-4"><Link href="/contact" className="hover:text-green-300">Contact</Link></li>
              <li className="mb-4"><Link href="/faq" className="hover:text-green-300">FAQ</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-grow bg-gradient-to-br from-green-100 to-green-300 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-4 text-green-800">Plant Identifier</h1>
            <p className="text-center text-green-700 mb-8">
              Discover the fascinating world of plants! Upload an image or take a photo, and let our AI identify the species for you.
            </p>

            {/* How to use cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <label htmlFor="image-upload" className="block text-lg font-medium text-gray-700 mb-2">
                  Upload a plant image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              <div className="mb-6">
                <button
                  onClick={startCamera}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Take a Photo
                </button>
              </div>
              {showCamera && (
                <div className="mb-6">
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                  <button
                    onClick={captureImage}
                    className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Capture Image
                  </button>
                </div>
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
              {preview && (
                <div className="mb-6 flex justify-center">
                  <div className="w-96 h-96 relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={preview}
                      alt="Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!image || loading}
                  className="w-60 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 text-lg font-semibold"
                >
                  {loading ? 'Identifying...' : 'Identify Plant'}
                </button>
              </div>
              {result && !result.error && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-green-800 mb-4">Plant Details:</h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Description:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{result.description}</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-green-200">
                          <th className="p-3 font-semibold">Property</th>
                          <th className="p-3 font-semibold">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <td className="p-3 font-medium">Common Name</td>
                          <td className="p-3">{result.commonName}</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3 font-medium">Scientific Name</td>
                          <td className="p-3"><i>{result.scientificName}</i></td>
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3 font-medium">Family</td>
                          <td className="p-3">{result.family}</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-3 font-medium">Native Region</td>
                          <td className="p-3">{result.nativeRegion}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {result && result.error && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700">{result.error}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

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