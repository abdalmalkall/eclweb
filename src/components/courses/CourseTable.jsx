import { useState } from 'react';
import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCourses } from '../../hooks/useCourses';
import CourseForm from './CourseForm';
import DeleteCourseConfirm from './DeleteCourseConfirm';
import { useNotification } from '../../contexts/NotificationContext';

const CourseTable = () => {
  const [sorting, setSorting] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const { showNotification } = useNotification();
  
  const {
    courses,
    isLoading,
    isError,
    error,
    refetch,
    addCourse,
    isAddingCourse,
    updateCourse,
    isUpdatingCourse,
    deleteCourse,
    isDeletingCourse,
    isProcessingCourse
  } = useCourses(showNotification);

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
    columnHelper.accessor('price', {
      header: 'Price',
      cell: info => <div className="text-right">${Number(info.getValue()).toFixed(2)}</div>,
    }),
    columnHelper.accessor('category.name', {
      header: 'Category',
      cell: info => info.getValue() || 'Uncategorized',
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
        const course = info.row.original;
        const isProcessing = isProcessingCourse(course.id);
        
        return (
          <div className="flex space-x-2 justify-end">
            <button 
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => {
                setSelectedCourse(course);
                setIsEditModalOpen(true);
              }}
              disabled={isProcessing}
            >
              {isUpdatingCourse && selectedCourse?.id === course.id 
                ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Editing...</span>
                  </span>
                : 'Edit'
              }
            </button>
            <button 
              className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => {
                setSelectedCourse(course);
                setIsDeleteModalOpen(true);
              }}
              disabled={isProcessing}
            >
              {isDeletingCourse && selectedCourse?.id === course.id
                ? <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deleting...</span>
                  </span>
                : 'Delete'
              }
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: courses,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleAddCourse = (newCourse) => {
    addCourse(newCourse);
    setIsAddModalOpen(false);
  };

  const handleEditCourse = (updatedCourse) => {
    updateCourse(updatedCourse);
    setIsEditModalOpen(false);
  };

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      deleteCourse(selectedCourse.id);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
        <p className="font-medium">Error loading courses</p>
        <p>{error.message}</p>
        <button 
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => refetch()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Courses</h2>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsAddModalOpen(true)}
          disabled={isAddingCourse}
        >
          {isAddingCourse ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Adding...</span>
            </span>
          ) : (
            'Add New Course'
          )}
        </button>
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
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <CourseForm 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddCourse}
          isSubmitting={isAddingCourse}
          mode="add"
        />
      )}

      {/* Edit Course Modal */}
      {isEditModalOpen && selectedCourse && (
        <CourseForm 
          isOpen={isEditModalOpen}
          course={selectedCourse}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditCourse}
          isSubmitting={isUpdatingCourse}
          mode="edit"
        />
      )}

      {/* Delete Course Confirmation */}
      {isDeleteModalOpen && selectedCourse && (
        <DeleteCourseConfirm
          isOpen={isDeleteModalOpen}
          course={selectedCourse}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteCourse}
          isSubmitting={isDeletingCourse}
        />
      )}
    </div>
  );
};

export default CourseTable;