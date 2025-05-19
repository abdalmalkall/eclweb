import axiosInstance from './axiosConfig';


// Fetch all Courses with proper error handling
export const fetchCourses = async () => {
  try {
    const response = await axiosInstance.get('/courses');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch courses');
  }
};

export const getCourse = async () => {
  try {
    const response = await axiosInstance.get('/courses/:id');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get course');
  }
};


// Create a new Course with image upload
export const createCourse = async (courseData) => {
  try {
    const formData = new FormData();

    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('price', courseData.price);
    formData.append('status', courseData.status);

    if (courseData.image) {
      formData.append('image', courseData.image);
    }

    const response = await axiosInstance.post('/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to create course');
  }
};


// Update an existing Course with image upload
export const updateCourse = async (courseData) => {
  try {
    const formData = new FormData();

    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('price', courseData.price);
    formData.append('status', courseData.status);

    if (courseData.image) {
      formData.append('image', courseData.image);
    }

    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(`/courses/${courseData.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update course with ID: ${courseData.id}`);
  }
};


// Delete a Course
export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete course with ID: ${id}`);
  }
};
