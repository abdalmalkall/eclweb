import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/usersApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch all users
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    onError: (error) => {
      showNotification(`Error fetching users: ${error.message}`, 'error');
    },
  });

  // Create user
  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification('User added successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error adding user: ${error.message}`, 'error');
    },
  });

  // Update user
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification('User updated successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error updating user: ${error.message}`, 'error');
    },
  });

  // Delete user
  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification('User deleted successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error deleting user: ${error.message}`, 'error');
    },
  });

  return {
    // Query data
    users: usersQuery.data?.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    refetch: usersQuery.refetch,

    // Mutations
    addUser: addUserMutation.mutate,
    isAddingUser: addUserMutation.isPending,

    updateUser: updateUserMutation.mutate,
    isUpdatingUser: updateUserMutation.isPending,
    updatingUserId: updateUserMutation.variables?.id,

    deleteUser: deleteUserMutation.mutate,
    isDeletingUser: deleteUserMutation.isPending,
    deletingUserId: deleteUserMutation.variables,

    // Check if specific user is being processed
    isProcessingUser: (id) => {
      return (
        (updateUserMutation.isPending && updateUserMutation.variables?.id === id) ||
        (deleteUserMutation.isPending && deleteUserMutation.variables === id)
      );
    },
  };
};
