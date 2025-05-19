import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/api/coursesApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useCourses = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch all courses
  const coursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    onError: (error) => {
      showNotification(`Error fetching courses: ${error.message}`, 'error');
    },
  });

  // Create a new course
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      showNotification('Course created successfully', 'success');
      queryClient.invalidateQueries(['courses']);
    },
    onError: (error) => {
      showNotification(`Error creating course: ${error.message}`, 'error');
    },
  });

  // Update a course
  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      showNotification('Course updated successfully', 'success');
      queryClient.invalidateQueries(['courses']);
    },
    onError: (error) => {
      showNotification(`Error updating course: ${error.message}`, 'error');
    },
  });

  // Delete a course
  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      showNotification('Course deleted successfully', 'success');
      queryClient.invalidateQueries(['courses']);
    },
    onError: (error) => {
      showNotification(`Error deleting course: ${error.message}`, 'error');
    },
  });

  return {
    courses: coursesQuery.data?.data || [],
    isLoadingCourses: coursesQuery.isLoading,
    createCourse: createCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    refetchCourses: coursesQuery.refetch,
  };
};
