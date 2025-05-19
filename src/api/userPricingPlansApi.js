import axiosInstance from './axiosConfig';

// ✅ Create a new User Pricing Plan
export const createUserPricingPlansApi = async (planData) => {
  try {
    const formData = new FormData();
    formData.append('pricing_plan_id', planData.pricing_plan_id);
    formData.append('paid_amount', planData.paid_amount);

    const response = await axiosInstance.post(`/user-pricing-plans`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to create pricing plan`);
  }
};

// ✅ Get all User Pricing Plans
export const fetchAllUserPricingPlans = async () => {
  try {
    const response = await axiosInstance.get('/user-pricing-plans');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch user pricing plans');
  }
};

// ✅ Get a specific User Pricing Plan by ID
export const fetchUserPricingPlanById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user-pricing-plans/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch user pricing plan with ID: ${id}`);
  }
};

// ✅ Cancel a User Pricing Plan by ID
export const cancelUserPricingPlan = async (id) => {
  try {
    const response = await axiosInstance.post(`/user-pricing-plans/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to cancel user pricing plan with ID: ${id}`);
  }
};
