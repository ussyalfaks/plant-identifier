'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
// import Link from 'next/link'
import { identifyPlant } from '../utils/plantIdentifier'
import Footer from './components/footer'
import Card from './components/card'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCard, setShowCard] = useState(true); 


  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 4MB

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File is too large. Please choose an image smaller than 4MB.');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setShowCard(false);
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
   <>
  
   <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex flex-grow">
   
  
      
        {/* Main content */}
        <main className="flex-grow bg-gradient-to-br from-green-100 to-green-300 ">
        {/* <div>
              <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste aliquam dolores quidem incidunt ea repudiandae reprehenderit amet sapiente voluptate? Recusandae esse quae quaerat vero error perferendis, quis doloribus deleniti libero.
              </h1>
            </div> */}
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-5xl font-bold text-center mb-4 text-green-800">Plant Identifier</h1>
            <p className="text-center text-green-700 mb-8">
              Discover the fascinating world of plants! Upload an image or take a photo, and let our AI identify the species for you.
            </p>

          

            <div className="bg-white rounded-xl shadow-lg p-6">
            <label htmlFor="image-upload" className="block text-lg font-medium text-gray-700 mb-2">
                  Upload a plant image
                </label>
              <div className=" flex  justify-between mb-6">
                <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                </div>
                <div>
                <button
                  onClick={startCamera}
                  className="w-36 bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
                >
                  Take a Photo
                </button>
                </div>
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
                  <div className="w-96 h-96 max-md:w-80 max-md:h-72 relative rounded-xl overflow-hidden shadow-lg">
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
          {showCard && <Card />}
        </main>
      </div>

      <Footer />
    </div>
   </>
  )
}