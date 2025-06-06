import React from 'react';
import Download from '@/components/svg/Download';
import { Link } from 'react-router-dom';

// Course card component for reusability
const CourseCard = ({ title, description }) => {
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
            width: '60px',
            height: '60px',
        },
        innerCard: {
            backgroundColor: 'white',
            padding: '15px',
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
            bottom: '12px',
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
            bottom: '-23px',
            alignItems: 'center',
            gap: '4px',
        },
    };

    return (
        <div style={styles.container} className='mt-10 mb-20'>
            <div style={styles.card}>
                <div style={styles.logoContainer}>
                    {/* Vue.js Logo - يمكن تغييره حسب نوع الكورس */}
                    <svg style={styles.vueLogo} viewBox="0 0 196.32 170.02" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#42b883" d="M120.83 0L98.16 39.26L75.49 0H0L98.16 170.02L196.32 0H120.83Z" />
                        <path fill="#35495e" d="M120.83 0L98.16 39.26L75.49 0H39.37L98.16 102.01L156.95 0H120.83Z" />
                    </svg>
                </div>

                <div style={styles.innerCard}>
                    <h3 style={styles.cardTitle}>{title}</h3>
                    <p style={styles.cardText}>{description}</p>

                    <div style={styles.buttonGroup} className='mb-4'>
                        <button style={styles.btn}>
                            <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" strokeWidth="2" />
                                <path d="M9.5 8.5L14.5 12L9.5 15.5V8.5Z" fill="#666" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Demo
                        </button>
                        <button style={styles.btn}>
                            <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6L12 13L2 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Email Now
                        </button>
                    </div>
                    <div style={styles.btnD} className="flex mt-3 justify-center">
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
    );
};

function PopularCourses() {
    const courses = [
        {
            title: "Angular JS",
            description: "A JavaScript-based open-source front-end web framework for developing single-page applications."
        },
        {
            title: "AWS",
            description: "AWS Coaching and Certification helps you build and validate your skills so you can get more out of the cloud."
        },
        {
            title: "Vue JS",
            description: "An open-source model-view-viewmodel front end JavaScript framework for building user interfaces & single-page applications."
        },
        {
            title: "Power BI",
            description: "An interactive data visualization software developed by Microsoft with primary focus on business intelligence."
        },
        {
            title: "Python",
            description: "Python is an interpreted high-level general-purpose programming language."
        },
        {
            title: "React JS",
            description: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components."
        },
        {
            title: "Software Testing",
            description: "The process of evaluating and verifying that a software product or application does what it is supposed to do."
        },
        {
            title: "Core UI",
            description: "Learn the fastest way to build a modern dashboard for any platform: browser, server, or device."
        }
    ];

    return (
        <div className="w-full max-w-[1700px] mx-auto px-4 py-8 bg-white">
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    <span className="text-blue-900">Popular </span>
                    <span className="text-orange-500">Courses</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        description={course.description}
                    />
                ))}
            </div>
            <div className="flex justify-center mt-20">
                <Link to="/Courses" >
                    <button className="bg-blue-900 text-white py-2 px-8 rounded">
                        View All Courses
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default PopularCourses;
