import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from '@/api/pricingApi';
import { useNotification } from '@/contexts/NotificationContext';

export const usePricingPlans = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // Fetch all pricing plans
  const pricingPlansQuery = useQuery({
    queryKey: ['pricingPlans'],
    queryFn: fetchPricingPlans,
    onError: (error) => {
      showNotification(`Error fetching pricing plans: ${error.message}`, 'error');
    },
  });

  // Create a new pricing plan
  const createPricingPlanMutation = useMutation({
    mutationFn: createPricingPlan,
    onSuccess: () => {
      showNotification('Pricing plan created successfully', 'success');
      queryClient.invalidateQueries(['pricingPlans']);
    },
    onError: (error) => {
      showNotification(`Error creating pricing plan: ${error.message}`, 'error');
    },
  });

  // Update a pricing plan
  const updatePricingPlanMutation = useMutation({
    mutationFn: updatePricingPlan,
    onSuccess: () => {
      showNotification('Pricing plan updated successfully', 'success');
      queryClient.invalidateQueries(['pricingPlans']);
    },
    onError: (error) => {
      showNotification(`Error updating pricing plan: ${error.message}`, 'error');
    },
  });

  // Delete a pricing plan
  const deletePricingPlanMutation = useMutation({
    mutationFn: deletePricingPlan,
    onSuccess: () => {
      showNotification('Pricing plan deleted successfully', 'success');
      queryClient.invalidateQueries(['pricingPlans']);
    },
    onError: (error) => {
      showNotification(`Error deleting pricing plan: ${error.message}`, 'error');
    },
  });

  return {
    pricingPlans: pricingPlansQuery.data?.data || [],
    isLoadingPricingPlans: pricingPlansQuery.isLoading,
    createPricingPlan: createPricingPlanMutation.mutate,
    updatePricingPlan: updatePricingPlanMutation.mutate,
    deletePricingPlan: deletePricingPlanMutation.mutate,
    refetchPricingPlans: pricingPlansQuery.refetch,
  };
};