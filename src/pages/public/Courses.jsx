import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CourseCard from './CourseCard';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('popular');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/public/courses');
        console.log('API Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  });

  // Debug log to check data structure
  useEffect(() => {
    console.log('Current data:', data);
  }, [data]);

  const getFilteredCourses = () => {
    // Make sure data exists and is accessible before processing
    if (!data) {
      console.log('No data available');
      return [];
    }
    
    // Check if data is an array or if it has a data property (common API pattern)
    const coursesArray = Array.isArray(data) ? data : data.data;
    
    if (!coursesArray || !Array.isArray(coursesArray)) {
      console.log('Data is not in expected format:', data);
      return [];
    }
    
    console.log('Processing courses array:', coursesArray);

    switch (activeTab) {
      case 'popular':
        return [...coursesArray].sort((a, b) => b.users_count - a.users_count);
      case 'recommended':
        // You can define your own logic for recommended courses
        return coursesArray.filter(course => [1, 3, 5].includes(course.id));
      case 'bestPrice':
        return [...coursesArray].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      default:
        return coursesArray;
    }
  };

  const filteredCourses = getFilteredCourses();
  
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Courses</h1>
      <p className="text-gray-600">Your Ultimate Guide to Learning</p>
    </div>
    
    <div className="flex justify-center mb-8">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 ${activeTab === 'popular' ? 'font-semibold border-b-2 border-black' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'recommended' ? 'font-semibold border-b-2 border-black' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          Recommended
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'bestPrice' ? 'font-semibold border-b-2 border-black' : ''}`}
          onClick={() => setActiveTab('bestPrice')}
        >
          Best Price
        </button>
      </div>
    </div>

    {isLoading && (
      <div className="flex justify-center items-center h-40">
        <p>Loading courses...</p>
      </div>
    )}

    {error && (
      <div className="bg-red-50 p-4 rounded-lg text-red-700">
        <p>Error loading courses. Please try again later.</p>
      </div>
    )}

    {!isLoading && !error && filteredCourses.length === 0 && (
      <div className="text-center text-gray-500">
        No courses found. Please check the API endpoint.
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
      {filteredCourses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
    
    <div className="mt-8 flex justify-center">
      <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition">
        View All Courses
      </button>
    </div>
  </div>
  );
};

export default Courses;