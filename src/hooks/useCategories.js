import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../api/categoryApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Query for fetching categories
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    onError: (error) => {
      showNotification(`Error fetching categories: ${error.message}`, 'error');
    }
  });

  // Mutation for adding a new category
  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showNotification('Category added successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error adding category: ${error.message}`, 'error');
    }
  });

  // Mutation for updating a category
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showNotification('Category updated successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error updating category: ${error.message}`, 'error');
    }
  });

  // Mutation for deleting a category
  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      showNotification('Category deleted successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error deleting category: ${error.message}`, 'error');
    }
  });

  return {
    // Queries
    categories: categoriesQuery.data?.data || [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,
    refetch: categoriesQuery.refetch,
    
    // Mutations
    addCategory: addCategoryMutation.mutate,
    isAddingCategory: addCategoryMutation.isPending,
    
    updateCategory: updateCategoryMutation.mutate,
    isUpdatingCategory: updateCategoryMutation.isPending,
    updatingCategoryId: updateCategoryMutation.variables?.id,
    
    deleteCategory: deleteCategoryMutation.mutate,
    isDeletingCategory: deleteCategoryMutation.isPending,
    deletingCategoryId: deleteCategoryMutation.variables,
    
    // Helper to check if a specific category is being processed
    isProcessingCategory: (id) => {
      return (
        (updateCategoryMutation.isPending && updateCategoryMutation.variables?.id === id) ||
        (deleteCategoryMutation.isPending && deleteCategoryMutation.variables === id)
      );
    }
  };
};