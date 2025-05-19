import axiosInstance from './axiosConfig';


// Fetch all Modules for a specific Course
export const fetchModules = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch modules for course ID: ${courseId}`);
  }
};


// Create a new Module for a Course
export const createModule = async (courseId, moduleData) => {
  try {
    const formData = new FormData();

    formData.append('title', moduleData.title);
    formData.append('content', moduleData.content);
    formData.append('order', moduleData.order);

    const response = await axiosInstance.post(`/courses/${courseId}/modules`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to create module for course ID: ${courseId}`);
  }
};


// Update a specific Module for a Course
export const updateModule = async (courseId, moduleData) => {
  try {
    const formData = new FormData();

    formData.append('title', moduleData.title);
    formData.append('content', moduleData.content);
    formData.append('order', moduleData.order);
    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(
      `/courses/${courseId}/modules/${moduleData.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update module ID: ${moduleData.id}`);
  }
};


// Delete a Module from a Course
export const deleteModule = async (courseId, moduleId) => {
  try {
    const response = await axiosInstance.delete(`/courses/${courseId}/modules/${moduleId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete module ID: ${moduleId}`);
  }
};
