import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/api/axiosConfig';

const CoursePage = () => {
  // الحالة لتتبع أقسام الدورة الموسعة
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`/courses/${id}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading course:', err);
        setLoading(false);
      });
  }, [id]);

  // تبديل توسيع القسم
  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // إذا كانت البيانات قيد التحميل، اعرض مؤشر التحميل
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // استخدام البيانات الافتراضية إذا لم يتم تحميل البيانات من الخادم
  const courseData = course && course.title ? course : {
    title: "Angular JS",
    courseInfo: {
      about: "This comprehensive Angular JS course takes you from the basics to advanced concepts. Learn component-based architecture, routing, forms, services, HTTP requests, and more in this hands-on learning experience.",
      objectives: [
        "Understand Angular core concepts and architecture",
        "Build single-page applications with Angular",
        "Master Angular components, directives, and services",
        "Implement client-side routing and navigation",
        "Work with forms and HTTP in Angular applications"
      ],
      content: {
        "01 HTML": [
          "Introduction to HTML",
          "HTML Elements and Attributes",
          "HTML Forms and Input Types",
          "HTML Semantic Elements"
        ],
        "02 CSS": [
          "CSS Selectors and Properties",
          "CSS Box Model",
          "CSS Flexbox and Grid",
          "CSS Animations and Transitions"
        ],
        "03 JavaScript": [
          "JavaScript Fundamentals",
          "Working with DOM",
          "Event Handling",
          "Asynchronous JavaScript"
        ],
        "04 Angular Basics": [
          "Introduction to Angular",
          "Components and Templates",
          "Data Binding",
          "Directives and Pipes"
        ]
      },
      projects: {
        "Angular Hello World Project": [
          "Create a simple Angular application",
          "Understand project structure",
          "Learn component creation"
        ],
        "Angular Routing Project": [
          "Implement navigation between views",
          "Create route guards",
          "Handle route parameters"
        ],
        "Angular Forms Project": [
          "Build template-driven forms",
          "Implement reactive forms",
          "Add form validation"
        ],
        "Angular Services Project": [
          "Create and inject services",
          "Implement dependency injection",
          "Share data between components"
        ],
        "Angular HTTP Project": [
          "Connect to REST APIs",
          "Handle HTTP responses",
          "Implement error handling"
        ],
        "Angular Components Project": [
          "Create reusable components",
          "Implement component communication",
          "Use content projection"
        ]
      }
    }
  };

  // مكونات إعادة الاستخدام للعناوين
  const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-4 w-full mb-8">
      <h2 className="text-[#FF914C] text-2xl font-bold whitespace-nowrap">{title}</h2>
      <div className="h-[2px] bg-[#FF914C] flex-grow"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* قسم العرض الرئيسي */}
      <section className="bg-[#003F7D] text-white rounded-b-3xl px-8 py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-10"></div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {courseData && courseData.title ? courseData.title.charAt(0) : 'A'}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#FF8B36]">{courseData && courseData.title ? courseData.title : 'Course'}:</span><br />
              Basic to Advance Level Coding
            </h1>
          </div>
        </div>
      </section>

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحتوى الأيسر */}
          <div className="lg:col-span-2">
            {/* عن الدورة */}
            <section className="py-8 px-6 w-full">
              <SectionHeader title="About The Course" />
              <div>
                <p className="text-gray-700">
                  {courseData.courseInfo.about}
                </p>
              </div>
            </section>

            {/* الأهداف */}
            <section className="py-8 px-6">
              <SectionHeader title="Objectives" />
              <div className="space-y-4 mt-4">
                {courseData.courseInfo.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* الشريط الجانبي لمحتوى الدورة */}
          <div className="lg:col-span-1 relative">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 z-20">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Course Content</h3>
              <div className="course-items">
                {Object.entries(courseData.courseInfo.content).map(([section, lessons], index) => (
                  <div key={section} className="border-b border-gray-200 last:border-b-0">
                    <div 
                      className="py-3 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="font-semibold text-blue-800">
                        {section.toUpperCase()}
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transform ${expandedSections[index] ? 'rotate-180' : ''} transition-transform`} 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                    <div className={`pb-3 text-sm text-gray-600 ${expandedSections[index] ? '' : 'hidden'}`}>
                      {lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center py-1">
                          <div className="w-3 h-3 rounded-full mr-2 bg-gray-300"></div>
                          <span className="flex-1">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 -left-8 z-10 transform translate-y-1/2 hidden lg:block">
              <div className="h-28 w-28 bg-orange-400 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>

        {/* قسم المشاريع */}
        <section className="py-8 px-6 w-full">
          <SectionHeader title={`${courseData && courseData.title ? courseData.title : 'Course'} Projects`} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(courseData.courseInfo.projects).map(([projectTitle, projectDetails], index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#FF914C]/10 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-[#FF914C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">{projectTitle}</h3>
                  </div>
                  <div className="ml-10">
                    {projectDetails.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm mb-1 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 inline-block"></span>
                        {detail}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-end w-full">
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* تذييل الصفحة */}
      {/* <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} {courseData && courseData.title ? courseData.title : 'Course'} Course. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default CoursePage;