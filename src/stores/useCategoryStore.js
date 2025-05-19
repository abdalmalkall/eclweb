import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  // Optional initial state if you want to keep UI state separate from react-query
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedCategory: null,
  
  // Actions
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
  
  openEditModal: (category) => set({ 
    isEditModalOpen: true,
    selectedCategory: category 
  }),
  closeEditModal: () => set({ 
    isEditModalOpen: false,
    selectedCategory: null
  }),
  
  openDeleteModal: (category) => set({ 
    isDeleteModalOpen: true,
    selectedCategory: category 
  }),
  closeDeleteModal: () => set({ 
    isDeleteModalOpen: false,
    selectedCategory: null
  }),
}));

export default useCategoryStore;