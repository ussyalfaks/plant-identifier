import Layout from './layout';
import Image from 'next/image';

 function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6">About Plant Identifier</h1>
        
        <div className="mb-8">
          <Image 
            src="/images/plant-collage.jpg" 
            alt="Various plants" 
            width={800} 
            height={400} 
            className="rounded-lg shadow-md"
          />
        </div>

        <p className="text-lg mb-6">
          Plant Identifier is an AI-powered tool designed to help nature enthusiasts, gardeners, and curious minds discover and learn about the plants around them.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          Our mission is to connect people with nature by making plant identification accessible, educational, and fun. We believe that understanding the flora around us is key to appreciating and preserving our natural world.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">How It Works</h2>
        <p className="text-lg mb-6">
          Using advanced machine learning algorithms, Plant Identifier can recognize thousands of plant species from a single photo. Simply upload an image or take a picture, and our AI will provide you with detailed information about the plant, including its common and scientific names, family, and interesting facts.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Team</h2>
        <p className="text-lg">
          Plant Identifier is developed by a passionate team of botanists, software engineers, and AI specialists. Were committed to continually improving our technology and expanding our database to provide the most accurate and comprehensive plant identification service possible.
        </p>
      </div>
    </Layout>
  );
}

export default About