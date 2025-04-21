import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function CustomerTestimonials() {
  const sliderRef = useRef(null);
  
  // Fetch testimonials using React Query
  const { data: testimonials, isLoading, isError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/public/comments/approved');
      return response.data.data;
    }
  });

  // Navigation handlers
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading testimonials. Please try again later.
      </div>
    );
  }

  // Empty state
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No testimonials available at this time.
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header - Exactly as in image */}
        <h2 className="text-3xl font-bold mb-2 text-black">Customer testimonials</h2>
        <p className="text-gray-700 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Scrollable container - matches image layout */}
          <div 
            ref={sliderRef} 
            className="flex overflow-x-auto gap-6 pb-8 scroll-smooth snap-x hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-shrink-0 w-full max-w-xs sm:max-w-sm border border-gray-200 rounded p-6 snap-start"
                style={{ minWidth: "240px" }}
              >
                {/* Star Rating - Exact layout from image */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-black' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content - Matching the card in image */}
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>

                {/* User Info with Avatar - Matching layout from image */}
                <div className="flex items-center">
                  <img 
                    src={`/api/placeholder/40/40`}
                    alt={`${testimonial.user_name}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.user_name}</h4>
                    <p className="text-gray-600 text-xs">{testimonial.course_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Exact style from image */}
          <div className="flex justify-center gap-2 mt-4">
            <button 
              onClick={scrollLeft}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}