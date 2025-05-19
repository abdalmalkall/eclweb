/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useCourses } from '@/hooks/useCourses';
import Download from '@/components/svg/Download';
import EnrollNow from '@/components/svg/EnrollNow';
import LiveDemo from '@/components/svg/LiveDemo';
import { useEnrollments } from '@/hooks/useEnrollments';
import { Link } from 'react-router-dom';

export default function CoursesList() {
    // Estilos en línea para el componente React
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        card: {
            width: '240px',
            borderRadius: '8px',
            overflow: 'visible', // Changed from 'hidden' to allow the inner card to extend beyond
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#0e4b87',
            position: 'relative',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0',
        },
        vueLogo: {
            width: '90px',
            height: '90px',
        },
        innerCard: {
            backgroundColor: 'white',
            padding: '30px',
            width: '92%',
            position: 'absolute',
            bottom: '-70px', // Changed from '-40px' to position it higher
            borderRadius: '8px',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 10, // Added to ensure it appears on top
        },
        cardTitle: {
            fontWeight: 'bold',
            fontSize: '16px',
            margin: '0 0 8px 0',
        },
        cardText: {
            color: '#666',
            fontSize: '12px',
            margin: '0',
            lineHeight: '1.3',
        },
        buttonGroup: {
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
        },
        btn: {
            padding: '5px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
        btnIcon: {
            width: '12px',
            height: '12px',
        },
        cardFooter: {
            backgroundColor: '#ff7846',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            position: 'absolute',
            bottom: '12px', // Remained at the bottom of the card
            width: '70%',
        },
        footerText: {
            fontWeight: 'medium',
            fontSize: '12px',
        },
        btnD: {
            padding: '5px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            position: 'absolute',
            bottom: '-13px',
            alignItems: 'center',
            gap: '4px',
        },
    };

    const { courses, isLoadingCourses, refetchCourses } = useCourses();
    const { createEnrollment, createEnrollmentLoading } = useEnrollments();
    const [activeTab, setActiveTab] = useState('Opened');
    const [searchQuery, setSearchQuery] = useState('');
    const [enrollingCourseId, setEnrollingCourseId] = useState(null);

    // New state variables for sorting
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 12;

    // Click handler to close the sort menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            const sortMenu = document.getElementById('sort-menu-container');
            if (sortMenu && !sortMenu.contains(event.target)) {
                setShowSortMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle enrollment
    const handleEnroll = async (courseId) => {
        try {
            setEnrollingCourseId(courseId);
            await createEnrollment({ course_id: courseId });
            // Optional: Add success message or feedback here
        } catch (error) {
            console.error("Error enrolling in course:", error);
            // Optional: Add error handling UI feedback here
        } finally {
            setEnrollingCourseId(null);
        }
    };

    // Filter and sort courses
    const filteredAndSortedCourses = courses
        .filter(course => {
            // Filter by tab
            if (activeTab === 'All') return true;
            return course.status === activeTab;
        })
        .filter(course => {
            // Filter by search query
            if (!searchQuery) return true;
            return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            // Sort based on selected criteria
            if (sortBy === 'title') {
                if (sortOrder === 'asc') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            } else if (sortBy === 'date') {
                // Assuming there's a 'created_at' or similar field
                const dateA = new Date(a.created_at || a.date || 0);
                const dateB = new Date(b.created_at || b.date || 0);

                if (sortOrder === 'newest') {
                    return dateB - dateA;
                } else {
                    return dateA - dateB;
                }
            }
            return 0;
        });

    // Calculate pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Tabs for filtering
    const tabs = ['All', 'Opened', 'Coming Soon', 'Archived'];

    if (isLoadingCourses) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1700px] mx-auto px-4 py-4">
            {/* Header with minimal spacing */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-[120px] md:text-[90px] font-extrabold text-blue-900 leading-tight mb-6">
                    <span className="text-blue-900">World's<br />First AI Based</span>
                    <br />
                    <span className="text-[#F98149]">Online Learning<br />Platform</span>
                </h2>
            </div>

            {/* Tabs with search and sort */}
            <div className="flex mb-4 border-b">
                <div className="flex items-center justify-between w-full">
                    <div className="flex">
                        {/* Search input */}
                        <div className="relative mr-4">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-8 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                            <svg
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 21L16.65 16.65"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`pb-2 px-6 text-sm ${activeTab === tab
                                ? 'border-b-2 border-orange-400 text-orange-400 font-medium'
                                : 'text-gray-600'
                                }`}
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1);
                            }}
                        >
                            {tab}
                        </button>
                    ))}

                    <div>
                        {/* Sort dropdown button */}
                        <div id="sort-menu-container" className="relative ml-4">
                            <button
                                className="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                <span className="mr-2 text-gray-600">Sort By</span>
                                <svg
                                    className="text-gray-500"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {showSortMenu && (
                                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                        onClick={() => {
                                            setSortBy('title');
                                            setSortOrder('asc');
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        Title (A-Z)
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                        onClick={() => {
                                            setSortBy('title');
                                            setSortOrder('desc');
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        Title (Z-A)
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                        onClick={() => {
                                            setSortBy('date');
                                            setSortOrder('newest');
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        Newest First
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                        onClick={() => {
                                            setSortBy('date');
                                            setSortOrder('oldest');
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        Oldest First
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid - 4 columns with narrower cards and more space between them */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentCourses.map((course, index) => (
                    <div key={course.id || index} style={styles.container} className='mb-20 mt-5'>
                        <div style={styles.card}>
                            <div style={styles.logoContainer}>
                                {/* Vue.js Logo or Course Image */}
                                <Link to={`/Courses/${course.id}`}>
                                    {course.image ? (
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="h-14 w-auto"
                                        />
                                    ) : (
                                        <svg style={styles.vueLogo} viewBox="0 0 196.32 170.02" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#42b883" d="M120.83 0L98.16 39.26L75.49 0H0L98.16 170.02L196.32 0H120.83Z" />
                                            <path fill="#35495e" d="M120.83 0L98.16 39.26L75.49 0H39.37L98.16 102.01L156.95 0H120.83Z" />
                                        </svg>
                                    )}
                                </Link>

                            </div>

                            <div style={styles.innerCard}>
                                <h3 style={styles.cardTitle}>{course.title}</h3>
                                <p style={styles.cardText}>{course.description}</p>

                                <div style={styles.buttonGroup} className='mb-4'>
                                    {/* Buttons row */}
                                    <div className="flex justify-center space-x-1 mb-3">
                                        <button className="flex items-center text-xs border border-gray-300 rounded px-2 py-1">
                                            <span className="mr-1 text-orange-500"><LiveDemo /></span>
                                            <span className="text-gray-600">Live</span>
                                        </button>

                                        <button
                                            className="flex items-center text-xs border border-gray-300 rounded px-2 py-1"
                                            onClick={() => handleEnroll(course.id)}
                                            disabled={createEnrollmentLoading && enrollingCourseId === course.id}
                                        >
                                            <span className="mr-1 text-orange-500"><EnrollNow /></span>
                                            <span className="text-gray-600">
                                                {createEnrollmentLoading && enrollingCourseId === course.id
                                                    ? "Processing..."
                                                    : "Enroll Now"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div style={styles.btnD} className="flex mt-1 justify-center mr-5">
                                    <button className="bg-orange-500 text-white rounded-2xl flex items-center justify-center py-1 px-4 text-xs">
                                        <span className="mr-1">
                                            <Download />
                                        </span>
                                        Download Curriculum
                                    </button>
                                </div>
                            </div>

                            <div style={styles.cardFooter}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="white" />
                                </svg>
                                <span style={styles.footerText}>More Information</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination with improved spacing and alignment */}
            {filteredAndSortedCourses.length > 0 && (
                <div className="flex justify-center mt-10 mb-4">
                    <div className="flex space-x-3">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`w-8 h-8 flex items-center justify-center border rounded-md text-sm transition-colors duration-300
                                    ${currentPage === index + 1
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
                                    }`}
                                aria-label={`Page ${index + 1}`}
                                style={{ cursor: 'pointer' }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {filteredAndSortedCourses.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No courses found. Try a different search or filter.</p>
                    <button
                        onClick={refetchCourses}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Refresh Courses
                    </button>
                </div>
            )}
        </div>
    );
}