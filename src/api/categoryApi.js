
// src/api/categoryApi.js
import axiosInstance from './axiosConfig';

// Fetch all categories with proper error handling
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch categories');
  }
};

// Create a new category with proper error handling
export const createCategory = async (categoryData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', categoryData.name);
    
    if (categoryData.description) {
      formData.append('description', categoryData.description);
    }
    
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    const response = await axiosInstance.post('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to create category');
  }
};

// Update an existing category with proper error handling
export const updateCategory = async (categoryData) => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', categoryData.name);
    
    if (categoryData.description) {
      formData.append('description', categoryData.description);
    }
    
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }
    
    // For PUT requests with FormData, you might need to add this
    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(`/categories/${categoryData.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update category with ID: ${categoryData.id}`);
  }
};

// Delete a category with proper error handling
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete category with ID: ${id}`);
  }
};