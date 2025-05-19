import axiosInstance from './axiosConfig';


// Fetch all Pricing Plans for a specific Course
export const fetchPricingPlans = async () => {
  try {
    const response = await axiosInstance.get(`/pricing-plans`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to fetch pricing plans`);
  }
};


// Create a new Pricing Plan for a Course
export const createPricingPlan = async (planData) => {
  try {
    const formData = new FormData();

    formData.append('name', planData.name);
    formData.append('description', planData.description);
    formData.append('price', planData.price);
    formData.append('allowed_courses', planData.allowed_courses);
    formData.append('duration_days', planData.duration_days);
    formData.append('is_active', planData.is_active ? '1' : '0');


    const response = await axiosInstance.post(`/pricing-plans`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to create pricing plan`);
  }
};
                     

// Update a specific Pricing Plan
export const updatePricingPlan = async ( planData) => {
  try {
    const formData = new FormData();

    formData.append('name', planData.name);
    formData.append('description', planData.description);
    formData.append('price', planData.price);
    formData.append('allowed_courses', planData.allowed_courses);
    formData.append('duration_days', planData.duration_days);
    formData.append('is_active', planData.is_active ? '1' : '0');

    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(
      `/pricing-plans/${planData.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update pricing plan ID: ${planData.id}`);
  }
};


// Delete a Pricing Plan from a Course
export const deletePricingPlan = async (planId) => {
  try {
    const response = await axiosInstance.delete(`/pricing-plans/${planId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete pricing plan ID: ${planId}`);
  }
};
