// src/hooks/useUserPricingPlans.js 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createUserPricingPlansApi,
  fetchAllUserPricingPlans,
  fetchUserPricingPlanById,
  cancelUserPricingPlan,
} from '@/api/userPricingPlansApi';
import { useNotification } from '@/contexts/NotificationContext';

export const useUserPricingPlans = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  // ✅ Fetch all user pricing plans
  const allUserPlansQuery = useQuery({
    queryKey: ['userPricingPlans'],
    queryFn: fetchAllUserPricingPlans,
    onError: (error) => {
      showNotification(`خطأ في جلب خطط التسعير: ${error.message}`, 'error');
    },
  });

  // ✅ Create user pricing plan
  const createUserPricingPlanMutation = useMutation({
    mutationFn: createUserPricingPlansApi,
    onSuccess: () => {
      showNotification('تم إنشاء خطة التسعير للمستخدم بنجاح', 'success');
      queryClient.invalidateQueries(['userPricingPlans']);
    },
    onError: (error) => {
      showNotification(`خطأ في إنشاء خطة التسعير: ${error.message}`, 'error');
    },
  });

  // ✅ Cancel user pricing plan
  const cancelUserPricingPlanMutation = useMutation({
    mutationFn: cancelUserPricingPlan,
    onSuccess: () => {
      showNotification('تم إلغاء خطة التسعير بنجاح', 'success');
      queryClient.invalidateQueries(['userPricingPlans']);
    },
    onError: (error) => {
      showNotification(`خطأ في إلغاء الخطة: ${error.message}`, 'error');
    },
  });

  // ✅ Fetch single plan (تستخدمها عند الحاجة فقط)
  const getUserPricingPlanById = async (id) => {
    try {
      const data = await fetchUserPricingPlanById(id);
      return data;
    } catch (error) {
      showNotification(`خطأ في جلب الخطة: ${error.message}`, 'error');
      throw error;
    }
  };

  return {
    userPricingPlans: allUserPlansQuery.data?.data || [],
    isLoadingUserPricingPlans: allUserPlansQuery.isLoading,

    createUserPricingPlan: createUserPricingPlanMutation.mutate,
    isCreating: createUserPricingPlanMutation.isLoading,

    cancelUserPricingPlan: cancelUserPricingPlanMutation.mutate,
    isCanceling: cancelUserPricingPlanMutation.isLoading,

    getUserPricingPlanById, // تستخدمها في صفحة التفاصيل أو غيرها

    refetchUserPricingPlans: allUserPlansQuery.refetch,
  };
};
