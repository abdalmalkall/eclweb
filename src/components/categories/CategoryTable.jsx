// src/components/categories/CategoryTable.jsx
import { useState } from 'react';
import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCategories } from '../../hooks/useCategories';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const CategoryTable = () => {
  const [sorting, setSorting] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const {
    categories,
    isLoading,
    isError,
    error,
    refetch,
    addCategory,
    isAddingCategory,
    updateCategory,
    isUpdatingCategory,
    deleteCategory,
    isDeletingCategory,
    isProcessingCategory
  } = useCategories();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => <div className="font-medium">{info.getValue()}</div>,
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: info => <div className="max-w-md truncate">{info.getValue()}</div>,
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => (
        <div className="flex justify-center">
          <img 
            src={info.getValue()} 
            alt={`${info.row.original.name}`}
            className="h-10 w-10 rounded-md object-cover" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/100?text=No+Image';
            }}
          />
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => {
        const category = info.row.original;
        const isProcessing = isProcessingCategory(category.id);
        
        return (
          <div className="flex space-x-2 justify-end">
            <Button 
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setIsEditModalOpen(true);
              }}
              disabled={isProcessing}
            >
              {isUpdatingCategory && selectedCategory?.id === category.id 
                ? <span className="flex items-center"><Spinner size="sm" /><span className="ml-1">Editing...</span></span>
                : 'Edit'
              }
            </Button>
            <Button 
              variant="danger"
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setIsDeleteModalOpen(true);
              }}
              disabled={isProcessing}
            >
              {isDeletingCategory && selectedCategory?.id === category.id
                ? <span className="flex items-center"><Spinner size="sm" /><span className="ml-1">Deleting...</span></span>
                : 'Delete'
              }
            </Button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleAddCategory = (newCategory) => {
    console.log('Adding category:', newCategory);
    addCategory(newCategory);
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (updatedCategory) => {
    console.log('Editing category:', updatedCategory);
    updateCategory(updatedCategory);
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      console.log('Deleting category:', selectedCategory);
      deleteCategory(selectedCategory.id);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Spinner /></div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
        <p className="font-medium">Error loading categories</p>
        <p>{error.message}</p>
        <Button 
          className="mt-2" 
          variant="primary"
          onClick={() => refetch()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          disabled={isAddingCategory}
        >
          {isAddingCategory ? (
            <span className="flex items-center">
              <Spinner size="sm" />
              <span className="ml-2">Adding...</span>
            </span>
          ) : (
            'Add New Category'
          )}
        </Button>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}</span>
                      <span>
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td 
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddCategoryModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCategory}
          isSubmitting={isAddingCategory}
        />
      )}

      {isEditModalOpen && selectedCategory && (
        <EditCategoryModal 
          isOpen={isEditModalOpen}
          category={selectedCategory}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditCategory}
          isSubmitting={isUpdatingCategory}
        />
      )}

      {isDeleteModalOpen && selectedCategory && (
        <ConfirmDeletePopup
          isOpen={isDeleteModalOpen}
          title="Delete Category"
          message={`Are you sure you want to delete the category "${selectedCategory.name}"?`}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteCategory}
          isSubmitting={isDeletingCategory}
        />
      )}
    </div>
  );
};

export default CategoryTable;