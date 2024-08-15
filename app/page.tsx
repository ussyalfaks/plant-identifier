'use client'

import { useState } from 'react'
import Image from 'next/image'
import { identifyPlant } from '../utils/plantIdentifier'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async () => {
    if (image) {
      setLoading(true)
      try {
        const identification = await identifyPlant(image)
        setResult(identification)
      } catch (error) {
        console.error('Error identifying plant:', error)
        setResult('Error identifying plant. Please try again.')
      }
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">Plant Identifier</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
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
          {preview && (
            <div className="mb-4">
                <Image 
                  src={preview} 
                  alt="Preview" 
                  width={50} 
                  height={50} 
                  layout="responsive"
                  className="rounded-lg" 
                />         
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!image || loading}
            className="w-60 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
          {result && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Plant Details:</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}