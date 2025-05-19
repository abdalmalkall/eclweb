import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

const FAQAccordion = () => {
  // State to track which FAQ item is expanded
  const [expandedItem, setExpandedItem] = useState('who-is-eligible');

  // FAQ data
  const faqItems = [
    {
      id: 'who-is-eligible',
      question: 'Who is eligible for this program?',
      answer: 'Any fresher/Btech/MTech final year, Passed out, Individual, employed are eligible for this program.'
    },
    {
      id: 'duration',
      question: 'What is the duration of the program?',
      answer: 'The program duration varies depending on the specific course but typically ranges from 3 to 6 months.'
    },
    {
      id: 'placement',
      question: 'Do I get the assured placement?',
      answer: 'While we cannot guarantee placement, our program has a high placement rate and we provide extensive career support and connection to our industry partners.'
    },
    {
      id: 'academic',
      question: 'What is the basic academic percentage required to enroll for the course?',
      answer: 'A minimum of 60% throughout academic career (10th, 12th, and graduation) is generally required.'
    },
    {
      id: 'execution',
      question: 'What is the execution plan of the program?',
      answer: 'The program includes theoretical learning, practical assignments, projects, and mentorship sessions spread across the duration of the course.'
    },
    {
      id: 'online-1',
      question: 'Can we take this course online?',
      answer: 'Yes, all our courses are available in both online and offline formats.'
    },
    {
      id: 'employed',
      question: 'I am already employed, will I be eligible for the program?',
      answer: 'Yes, working professionals are eligible to join our programs. We offer flexible timing options to accommodate work schedules.'
    },
    {
      id: 'emergency',
      question: 'What if I miss the session due to an emergency?',
      answer: 'Recorded sessions are provided to all students. In case of emergencies, you can access these recordings and catch up at your convenience.'
    },
    {
      id: 'online-2',
      question: 'Can we take this course online?',
      answer: 'Yes, all our courses are available in both online and offline formats.'
    },
    {
      id: 'certificate',
      question: 'Do you provide any certificate after the program?',
      answer: 'Yes, upon successful completion of the program, you will receive an industry-recognized certificate.'
    },
    {
      id: 'suggestions',
      question: 'Have suggestions for us?',
      answer: 'We welcome your feedback and suggestions. Please share them through our feedback form or contact our support team directly.'
    },
  ];

  // Function to toggle accordion
  const toggleAccordion = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="max-w-7xl mx-auto font-sans  relative overflow-hidden">
      {/* Orange background elements */}
      <div className="fixed top-0 left-0 w-full h-100 bg-orange-500 rounded-bl-[90px] rounded-br-[90px] z-[-1]"></div>
      
      {/* Left side dots */}
      <div className="absolute left-4 top-1/4 space-y-1">
        {[...Array(10)].map((_, i) => (
          <div key={`dot-left-${i}`} className="flex space-x-1">
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="py-10 px-8">
        <h1 className="text-center text-2xl font-bold text-white mb-6 relative z-10">
          Frequently Asked Questions
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 relative z-10">
          {faqItems.map((item) => (
            <div key={item.id} className="border-b border-gray-100 last:border-b-0">
              <div 
                className="flex justify-between items-center py-4 cursor-pointer"
                onClick={() => toggleAccordion(item.id)}
              >
                <h3 className="text-gray-800 font-medium text-sm">
                  {item.question}
                </h3>
                <button className={`w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200 ${expandedItem === item.id ? 'text-orange-500 rotate-45' : 'text-orange-400'}`}>
                  <IoAdd className="text-lg" />
                </button>
              </div>
              
              {expandedItem === item.id && (
                <div className="pb-4 pl-6 border-l-2 border-orange-400 ml-2 text-xs text-gray-600">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;