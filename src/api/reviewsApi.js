import axiosInstance from './axiosConfig';


// Fetch all Reviews for a specific Course
export const fetchReviews = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/reviews`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch reviews for course ID: ${courseId}`);
  }
};


// Create a new Review for a Course
export const createReview = async (courseId, reviewData) => {
  try {
    const formData = new FormData();

    formData.append('rating', reviewData.rating);
    formData.append('comment', reviewData.comment);

    const response = await axiosInstance.post(`/courses/${courseId}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to create review for course ID: ${courseId}`);
  }
};


// Update a specific Review
export const updateReview = async (courseId, reviewData) => {
  try {
    const formData = new FormData();

    formData.append('rating', reviewData.rating);
    formData.append('comment', reviewData.comment);
    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(
      `/courses/${courseId}/reviews/${reviewData.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update review ID: ${reviewData.id}`);
  }
};


// Delete a Review from a Course
export const deleteReview = async (courseId, reviewId) => {
  try {
    const response = await axiosInstance.delete(`/courses/${courseId}/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete review ID: ${reviewId}`);
  }
};
