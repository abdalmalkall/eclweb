import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const EditCategoryModal = ({ isOpen, onClose, onEdit, category, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description,
        image: null
      });
      setPreviewUrl(category.image);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSubmitting ? undefined : onClose}
      title="Edit Category"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            disabled={isSubmitting}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
           </div>

<div>
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
    Image
  </label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleImageChange}
    disabled={isSubmitting}
    className="mt-1 block w-full text-sm text-gray-500
           file:mr-4 file:py-2 file:px-4
           file:rounded-md file:border-0
           file:text-sm file:font-semibold
           file:bg-blue-50 file:text-blue-700
           hover:file:bg-blue-100
           disabled:opacity-70"
  />
  {previewUrl && (
    <div className="mt-2">
      <img
        src={previewUrl}
        alt="Preview"
        className="h-24 w-24 object-cover rounded-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
        }}
      />
    </div>
  )}
</div>

<div className="flex justify-end space-x-2 pt-4">
  <Button 
    type="button" 
    variant="secondary" 
    onClick={onClose}
    disabled={isSubmitting}
  >
    Cancel
  </Button>
  <Button 
    type="submit"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <span className="flex items-center">
        <Spinner size="sm" />
        <span className="ml-2">Saving...</span>
      </span>
    ) : (
      'Save Changes'
    )}
  </Button>
</div>
</form>
</Modal>
);
};

export default EditCategoryModal;