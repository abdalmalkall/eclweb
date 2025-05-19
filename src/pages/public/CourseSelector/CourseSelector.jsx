import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaClipboardList, FaLaptopCode, FaCode, FaChartBar, FaArrowRight } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdFrontHand } from 'react-icons/md';

const CourseSelector = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  // Chat steps data
  const chatSteps = [
    {
      id: 1,
      message: "Welcome, Prasad! Let us know your current status?",
      options: [
        { id: "student", icon: <FaUser className="text-blue-900 text-2xl" />, text: "Student" },
        { id: "professional", icon: <FaGraduationCap className="text-blue-900 text-2xl" />, text: "Working Professional" },
        { id: "seeker", icon: <FaClipboardList className="text-blue-900 text-2xl" />, text: "Seeker of Job" }
      ]
    },
    {
      id: 2,
      message: "Great! Let me help you",
      buttons: [
        { id: "discover", text: "Discover Courses", isPrimary: true },
        { id: "suggest", text: "Suggest Course", isPrimary: false }
      ]
    },
    {
      id: 3,
      message: "Select the field you're interested",
      buttons: [
        { id: "programming", text: "Programming", isPrimary: true },
        { id: "data", text: "Data Field", isPrimary: false }
      ]
    },
    {
      id: 4,
      message: "If Field, then what do you prefer now?",
      options: [
        { id: "analytics", icon: <FaChartBar className="text-blue-900 text-2xl" />, text: "Analytics" },
        { id: "ai", icon: <FaCode className="text-blue-900 text-2xl" />, text: "AI/ML/DL" }
      ]
    },
    {
      id: 5,
      message: "Wow, you chose coding! What's next?",
      options: [
        { id: "frontend", icon: <FaLaptopCode className="text-blue-900 text-2xl" />, text: "Front End" },
        { id: "backend", icon: <FaCode className="text-blue-900 text-2xl" />, text: "Back End" },
        { id: "fullstack", icon: <FaChartBar className="text-blue-900 text-2xl" />, text: "Full Stack" }
      ]
    },
    {
      id: 6,
      message: "Excellent! Click next to get into",
      buttons: [
        { id: "next", text: "Next", isPrimary: true, icon: <FaArrowRight className="ml-1" /> }
      ]
    }
  ];

  // Handle option selection
  const handleOptionSelect = (stepId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [stepId]: optionId
    });
    
    // Move to next step
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 500);
  };

  // Handle button click
  const handleButtonClick = (stepId, buttonId) => {
    setSelectedOptions({
      ...selectedOptions,
      [stepId]: buttonId
    });
    
    // Special handling for final step
    if (stepId === 6 && buttonId === "next") {
      // Here you could redirect to a course page or perform other actions
      alert("Proceeding to course selection!");
    } else {
      // Move to next step
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto font-sans m-8"> {/* Increased max-width from max-w-md to max-w-2xl */}
      {/* Header */}
      <div className="text-center mb-6"> {/* Increased margin */}
        <h2 className="text-3xl font-bold"> {/* Increased font size */}
          <span className="text-blue-900">Choose The </span>
          <span className="text-orange-500">Course</span>
        </h2>
      </div>

      {/* Chat Container */}
      <div className="relative bg-blue-900 rounded-lg p-8 pb-16 overflow-hidden min-h-[600px]"> {/* Increased padding and minimum height */}
        {/* Left decorative dots */}
        <div className="absolute left-3 top-20 space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={`dot-left-${i}`} className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Right decorative chevrons */}
        <div className="absolute right-6 top-1/4">
          {[...Array(4)].map((_, i) => (
            <div key={`chevron-${i}`} className="text-orange-400 mb-1">
              <IoIosArrowDown className="transform rotate-90" />
            </div>
          ))}
        </div>

        {/* Bottom right decorative elements */}
        <div className="absolute bottom-4 right-4">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={`plus-${i}`} className="text-orange-400 text-lg">+</div>
            ))}
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={`plus2-${i}`} className="text-orange-400 text-lg">+</div>
            ))}
          </div>
        </div>

        {/* Bottom right circle */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-400 rounded-full"></div> {/* Increased size */}

        {/* Chat messages */}
        {chatSteps.map((step, index) => (
          <div 
            key={step.id} 
            className={`mb-6 ${index > currentStep ? 'hidden' : ''}`} /* Increased margin */
          >
            {/* Bot message */}
            <div className="flex items-start mb-4"> {/* Increased margin */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-md"> {/* Increased size and margin */}
                <MdFrontHand className="text-blue-900 text-xl" /> {/* Increased icon size */}
              </div>
              <div className="bg-white p-4 rounded-lg text-base text-gray-800 shadow-md max-w-[85%]"> {/* Increased padding and font size */}
                {step.message}
              </div>
            </div>

            {/* Options with icons */}
            {step.options && (
              <div className="flex flex-wrap gap-4 justify-center mt-3"> {/* Increased gap and margin */}
                {step.options.map((option, i) => (
                  <div 
                    key={i} 
                    className={`bg-blue-800 rounded-lg p-4 text-center w-28 cursor-pointer hover:bg-blue-700 transition-colors
                      ${selectedOptions[step.id] === option.id ? 'ring-2 ring-orange-400' : ''}`} /* Increased padding and width, added selected state */
                    onClick={() => handleOptionSelect(step.id, option.id)}
                  >
                    <div className="flex justify-center mb-2 bg-white rounded-full w-14 h-14 mx-auto items-center"> {/* Increased size and margin */}
                      {option.icon}
                    </div>
                    <div className="text-white text-sm">{option.text}</div> {/* Increased font size */}
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            {step.buttons && (
              <div className="flex gap-3 justify-center mt-3"> {/* Increased gap and margin */}
                {step.buttons.map((button, i) => (
                  <button
                    key={i}
                    className={`px-5 py-3 rounded-md text-base flex items-center justify-center transition-colors
                      ${button.isPrimary
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-blue-800 hover:bg-blue-700 text-white'
                      } ${selectedOptions[step.id] === button.id ? 'ring-2 ring-white' : ''}`} /* Increased padding and font size, added hover and selected states */
                    onClick={() => handleButtonClick(step.id, button.id)}
                  >
                    {button.text}
                    {button.icon && button.icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;