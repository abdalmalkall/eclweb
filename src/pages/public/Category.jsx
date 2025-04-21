import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const Category = () => {
  // Add navigation hook from react-router-dom
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/public/categories');
      return response.data;
    },
  });

  const handleViewAllCourses = () => {
    
  };

  const staticCategories = [
    { id: 1, name: 'Design & Development', courses_count: '50+', icon: 'code' },
    { id: 2, name: 'Marketing', courses_count: '50+', icon: 'share' },
    { id: 3, name: 'Development', courses_count: '50+', icon: 'repeat' },
    { id: 4, name: 'Communication', courses_count: '50+', icon: 'message-circle' },
    { id: 5, name: 'Digital Marketing', courses_count: '50+', icon: 'bar-chart-2' },
    { id: 6, name: 'Self Development', courses_count: '50+', icon: 'shuffle' },
    { id: 7, name: 'Business', courses_count: '50+', icon: 'briefcase' },
    { id: 8, name: 'Finance', courses_count: '50+', icon: 'book' },
    { id: 9, name: 'Consulting', courses_count: '50+', icon: 'clipboard' },
  ];

  // Icon components
  const IconComponent = ({ name }) => {
    switch (name) {
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'share':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        );
      case 'repeat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        );
      case 'message-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        );
      case 'bar-chart-2':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        );
      case 'shuffle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
        );
      case 'briefcase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        );
      case 'clipboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
    }
  };

  // Function to translate Arabic category names to English if needed
  const translateCategoryName = (name) => {
    // Simple translation mapping for example purposes
    const translations = {
      'البرمجة': 'Programming',
      // Add more translations as needed
    };
    
    return translations[name] || name; // Return translation or original if not found
  };

  const renderCategoryItem = (category, index) => {
    // Get English name for display
    const displayName = translateCategoryName(category.name);
    
    // Determine if using image from API or fallback to icon
    const hasApiImage = category.image && category.image.length > 0;
    
    return (
      <div key={category.id || `static-${index}`} className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
        {/* White box around icon/image */}
        <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
          {hasApiImage ? (
            <img src={category.image} alt={displayName} className="w-10 h-10 object-contain" />
          ) : (
            <IconComponent name={category.icon || 'code'} />
          )}
        </div>
        <div>
          <h3 className="font-medium text-base">{displayName}</h3>
          <p className="text-sm text-gray-600">{category.courses_count} Courses Available</p>
        </div>
      </div>
    );
  };

  // Combine static and API categories
  const renderCategories = () => {
    // Get API categories if available
    let apiCategories = [];
    if (data && data.data && Array.isArray(data.data)) {
      apiCategories = data.data;
    }
    
    return (
      <div className="space-y-8">
        {/* Static Categories Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {staticCategories.map((category, index) => renderCategoryItem(category, index))}
          </div>
        </div>
        
        {/* API Categories Section - Only show if there are API categories */}
        {apiCategories.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
              {apiCategories.map((category, index) => renderCategoryItem(category, index))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Static header section */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Explore Courses By Category</h1>
        <p className="text-gray-600">Discover a wide range of courses covering a variety of subjects, taught by expert instructors.</p>
      </div>

      {/* Dynamic categories section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading categories...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          <p>Error loading categories. Please try again later.</p>
        </div>
      ) : (
        renderCategories()
      )}

      {/* View all courses button - Now with onClick handler */}
      <div className="mt-8 flex justify-center">
        <button 
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition"
          onClick={handleViewAllCourses}
        >
          View All Courses
        </button>
      </div>
    </div>
  );
};

export default Category;