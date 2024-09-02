import Layout from './layout';
import { useState } from 'react';

const faqs = [
  {
    question: "How accurate is Plant Identifier?",
    answer: "Plant Identifier uses advanced AI technology and has an accuracy rate of over 90% for common plant species. However, factors like image quality and rare species can affect accuracy."
  },
  {
    question: "Can I use Plant Identifier offline?",
    answer: "Currently, Plant Identifier requires an internet connection to process images and access our database. We're exploring offline capabilities for future updates."
  },
  {
    question: "Is there a limit to how many plants I can identify?",
    answer: "There's no limit to the number of plants you can identify with our free version. However, we do have usage caps to prevent abuse of our system."
  },
  {
    question: "What information does Plant Identifier provide about identified plants?",
    answer: "For each identified plant, we provide the common name, scientific name, plant family, a brief description, and some interesting facts. We're constantly working to expand the information we offer."
  },
  {
    question: "Can Plant Identifier identify diseased plants or plant health issues?",
    answer: "While our primary function is species identification, we're developing features to help identify common plant diseases and health issues. Stay tuned for updates!"
  }
];

 function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleAnswer(index)}
              >
                <span className="text-lg font-semibold text-green-700">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Still have questions?</h2>
          <p className="text-gray-700">
            If you couldnt find the answer youre looking for, please dont hesitate to reach out to us through our <a href="/contact" className="text-green-600 hover:text-green-800">contact page</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default FAQ