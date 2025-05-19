import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchModules,
  createModule,
  updateModule,
  deleteModule,
} from '@/api/modulesApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useModules = (courseId) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch modules for specific course
  const modulesQuery = useQuery({
    queryKey: ['modules', courseId],
    queryFn: () => fetchModules(courseId),
    enabled: !!courseId,
    onError: (error) => {
      showNotification(`Error fetching modules: ${error.message}`, 'error');
    },
  });

  // Create module
  const addModuleMutation = useMutation({
    mutationFn: (moduleData) => createModule(courseId, moduleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules', courseId] });
      showNotification('Module created successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error creating module: ${error.message}`, 'error');
    },
  });

  // Update module
  const updateModuleMutation = useMutation({
    mutationFn: (moduleData) => updateModule(courseId, moduleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules', courseId] });
      showNotification('Module updated successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error updating module: ${error.message}`, 'error');
    },
  });

  // Delete module
  const deleteModuleMutation = useMutation({
    mutationFn: (moduleId) => deleteModule(courseId, moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules', courseId] });
      showNotification('Module deleted successfully!', 'success');
    },
    onError: (error) => {
      showNotification(`Error deleting module: ${error.message}`, 'error');
    },
  });

  return {
    // Query
    modules: modulesQuery.data?.data || [],
    isLoading: modulesQuery.isLoading,
    isError: modulesQuery.isError,
    error: modulesQuery.error,
    refetch: modulesQuery.refetch,

    // Mutations
    addModule: addModuleMutation.mutate,
    isAddingModule: addModuleMutation.isPending,

    updateModule: updateModuleMutation.mutate,
    isUpdatingModule: updateModuleMutation.isPending,
    updatingModuleId: updateModuleMutation.variables?.id,

    deleteModule: deleteModuleMutation.mutate,
    isDeletingModule: deleteModuleMutation.isPending,
    deletingModuleId: deleteModuleMutation.variables,

    // Helper
    isProcessingModule: (id) => {
      return (
        (updateModuleMutation.isPending && updateModuleMutation.variables?.id === id) ||
        (deleteModuleMutation.isPending && deleteModuleMutation.variables === id)
      );
    },
  };
};
