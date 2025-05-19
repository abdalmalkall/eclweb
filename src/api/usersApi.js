import axiosInstance from './axiosConfig';


// Fetch all User with proper error handling
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};


// Create a new User with proper error handling
export const createUser = async (usersData) => {
  try {
    const formData = new FormData();

    formData.append('name', usersData.name);

    if (usersData.email) {
      formData.append('email', usersData.email);
    }

    if (usersData.password) {
      formData.append('password', usersData.password);
    }

    if (usersData.role) {
      formData.append('role', usersData.role);
    }

    const response = await axiosInstance.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to create users');
  }
};


// Update an existing User with proper error handling
export const updateUser = async (usersData) => {
  try {
    const formData = new FormData();
    formData.append('name', usersData.name);

    if (usersData.email) {
      formData.append('email', usersData.email);
    }

    if (usersData.password) {
      formData.append('password', usersData.password);
    }

    if (usersData.role) {
      formData.append('role', usersData.role);
    }

    formData.append('_method', 'PUT');

    const response = await axiosInstance.post(`/users/${usersData.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to update users with ID: ${usersData.id}`);
  }
};


// Delete a User with proper error handling
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || `Failed to delete users with ID: ${id}`);
  }
};