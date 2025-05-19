// src\hooks\useEnrollments.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchEnrollments,
  fetchStudentEnrollments,
  fetchTrainerEnrollments,
  createEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
} from '@/api/enrollmentsApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useEnrollments = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch all enrollments
  const enrollmentsQuery = useQuery({
    queryKey: ['enrollments'],
    queryFn: fetchEnrollments,
    onError: (error) => {
      showNotification(`Error fetching enrollments: ${error.message}`, 'error');
    },
  });

  // Fetch student enrollments
  const studentEnrollmentsQuery = useQuery({
    queryKey: ['student-enrollments'],
    queryFn: fetchStudentEnrollments,
    onError: (error) => {
      showNotification(`Error fetching student enrollments: ${error.message}`, 'error');
    },
  });

  // Fetch trainer enrollments
  const trainerEnrollmentsQuery = useQuery({
    queryKey: ['trainer-enrollments'],
    queryFn: fetchTrainerEnrollments,
    onError: (error) => {
      showNotification(`Error fetching trainer enrollments: ${error.message}`, 'error');
    },
  });

  // Create enrollment
  const createEnrollmentMutation = useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      showNotification('Enrollment created successfully', 'success');
      queryClient.invalidateQueries(['enrollments']);
      queryClient.invalidateQueries(['student-enrollments']);
      queryClient.invalidateQueries(['trainer-enrollments']);
    },
    onError: (error) => {
      showNotification(`Error creating enrollment: ${error.message}`, 'error');
    },
  });

  // Update enrollment status
  const updateEnrollmentMutation = useMutation({
    mutationFn: ({ enrollmentId, status }) => updateEnrollmentStatus(enrollmentId, status),
    onSuccess: () => {
      showNotification('Enrollment updated successfully', 'success');
      queryClient.invalidateQueries(['enrollments']);
      queryClient.invalidateQueries(['student-enrollments']);
      queryClient.invalidateQueries(['trainer-enrollments']);
    },
    onError: (error) => {
      showNotification(`Error updating enrollment: ${error.message}`, 'error');
    },
  });

  // Delete enrollment
  const deleteEnrollmentMutation = useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      showNotification('Enrollment deleted successfully', 'success');
      queryClient.invalidateQueries(['enrollments']);
      queryClient.invalidateQueries(['student-enrollments']);
      queryClient.invalidateQueries(['trainer-enrollments']);
    },
    onError: (error) => {
      showNotification(`Error deleting enrollment: ${error.message}`, 'error');
    },
  });

  return {
    enrollments: enrollmentsQuery.data?.data || [],
    studentEnrollments: studentEnrollmentsQuery.data?.data || [],
    trainerEnrollments: trainerEnrollmentsQuery.data?.data || [],
    isLoadingEnrollments: enrollmentsQuery.isLoading,
    isLoadingStudentEnrollments: studentEnrollmentsQuery.isLoading,
    isLoadingTrainerEnrollments: trainerEnrollmentsQuery.isLoading,
    createEnrollment: createEnrollmentMutation.mutate,
    createEnrollmentLoading: createEnrollmentMutation.isLoading,
    updateEnrollmentStatus: updateEnrollmentMutation.mutate,
    deleteEnrollment: deleteEnrollmentMutation.mutate,
    refetchEnrollments: enrollmentsQuery.refetch,
    refetchStudentEnrollments: studentEnrollmentsQuery.refetch,
    refetchTrainerEnrollments: trainerEnrollmentsQuery.refetch,
  };
};
