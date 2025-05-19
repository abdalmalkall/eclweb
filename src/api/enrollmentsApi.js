// enrollmentsApi.js

import axiosInstance from './axiosConfig';


// Fetch all Enrollments
export const fetchEnrollments = async () => {
    try {
        const response = await axiosInstance.get('/enrollments');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch enrollments');
    }
};

// Get all enrollments for the current student
export const fetchStudentEnrollments = async () => {
    try {
        const response = await axiosInstance.get('/student/enrollments');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch student enrollments');
    }
};


// Get all enrollments for the current trainer
export const fetchTrainerEnrollments = async () => {
    try {
        const response = await axiosInstance.get('/trainer/enrollments');
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch trainer enrollments');
    }
};

// Create a new Enrollment
export const createEnrollment = async (enrollmentData) => {
    try {
        const formData = new FormData();

        formData.append('course_id', enrollmentData.course_id);
     console.log('Sending enrollment request:', enrollmentData);

        const response = await axiosInstance.post('/enrollments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Enrollment successful response:', response);

        return response.data;
    } catch (error) {
        console.error('Enrollment error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error; // رمي الخطأ للتعامل معه في المكون
    }
};


// Update the status of an Enrollment
export const updateEnrollmentStatus = async (enrollmentId, status) => {
    try {
        const formData = new FormData();
        formData.append('status', status);
        formData.append('_method', 'PUT');

        const response = await axiosInstance.post(`/enrollments/${enrollmentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message || `Failed to update enrollment ID: ${enrollmentId}`);
    }
};


// Delete an Enrollment
export const deleteEnrollment = async (enrollmentId) => {
    try {
        const response = await axiosInstance.delete(`/enrollments/${enrollmentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || `Failed to delete enrollment ID: ${enrollmentId}`);
    }
};
