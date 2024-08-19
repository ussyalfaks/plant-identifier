import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function identifyPlant(image: File): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageData = await fileToBase64(image);
    
    const imageParts = [
      {
        inlineData: {
          data: imageData,
          mimeType: image.type,
        },
      },
    ];

    const prompt = "Identify this plant and provide its common name, scientific name, family, native region, and a brief description. Format the response as a JSON object with the following structure: { commonName, scientificName, family, nativeRegion, description }";

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    return text; // This should now be a JSON string
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      return JSON.stringify({ error: `Error identifying plant: ${error.message}` });
    }
    return JSON.stringify({ error: 'An unknown error occurred while identifying the plant.' });
  }
}

// ... rest of the file remains the same
async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1]; // Remove the data URL prefix
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }