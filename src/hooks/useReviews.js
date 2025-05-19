import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../api/reviewApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useReviews = (courseId) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch reviews for specific course
  const reviewsQuery = useQuery({
    queryKey: ['reviews', courseId],
    queryFn: () => fetchReviews(courseId),
    enabled: !!courseId,
    onError: (error) => {
      showNotification(`Error fetching reviews: ${error.message}`, 'error');
    },
  });

  // Create review
  const addReviewMutation = useMutation({
    mutationFn: (reviewData) => createReview(courseId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', courseId] });
      showNotification('Review added successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error adding review: ${error.message}`, 'error');
    },
  });

  // Update review
  const updateReviewMutation = useMutation({
    mutationFn: (reviewData) => updateReview(courseId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', courseId] });
      showNotification('Review updated successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error updating review: ${error.message}`, 'error');
    },
  });

  // Delete review
  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(courseId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', courseId] });
      showNotification('Review deleted successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error deleting review: ${error.message}`, 'error');
    },
  });

  return {
    // Query
    reviews: reviewsQuery.data?.data || [],
    isLoading: reviewsQuery.isLoading,
    isError: reviewsQuery.isError,
    error: reviewsQuery.error,
    refetch: reviewsQuery.refetch,

    // Mutations
    addReview: addReviewMutation.mutate,
    isAddingReview: addReviewMutation.isPending,

    updateReview: updateReviewMutation.mutate,
    isUpdatingReview: updateReviewMutation.isPending,
    updatingReviewId: updateReviewMutation.variables?.id,

    deleteReview: deleteReviewMutation.mutate,
    isDeletingReview: deleteReviewMutation.isPending,
    deletingReviewId: deleteReviewMutation.variables,

    // Helper
    isProcessingReview: (id) => {
      return (
        (updateReviewMutation.isPending && updateReviewMutation.variables?.id === id) ||
        (deleteReviewMutation.isPending && deleteReviewMutation.variables === id)
      );
    },
  };
};
