/* eslint-disable no-undef */
import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useCourses } from '@/hooks/useCourses';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import ModulesDataTable from '@/pages/dashboard/Modules/ModulesDataTable'; // Import ModulesDataTable component

export default function CoursesPage() {
  const {
    courses,
    isLoadingCourses,
    createCourse,
    updateCourse,
    deleteCourse
  } = useCourses();

  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State to store selected course ID for modules
  const [showModules, setShowModules] = useState(false); // State to control modules view
  const formRef = useRef(null);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('rowIndex', {
        header: '#',
        cell: ({ row }) => row.index + 1,
        size: 50,
      }),
      columnHelper.accessor('image', {
        header: 'Image',
        cell: ({ row }) => (
          <div className="h-16 w-16 overflow-hidden rounded-md">
            {row.original.image ? (
              <img
                src={row.original.image}
                alt={row.original.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ getValue }) => <div className="font-medium">{getValue()}</div>,
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ getValue }) => (
          <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ getValue }) => <div>${parseFloat(getValue()).toFixed(2)}</div>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue();
          const getStatusColor = () => {
            switch (status.toLowerCase()) {
              case 'opened':
                return 'bg-green-100 text-green-800';
              case 'coming soon':
                return 'bg-yellow-100 text-yellow-800';
              case 'archived':
                return 'bg-gray-100 text-gray-800';
              default:
                return 'bg-blue-100 text-blue-800';
            }
          };
          return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor()}`}>
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewModules(row.original.id)}
              className="rounded p-1 text-green-600 hover:bg-green-100"
              title="View Modules"
            >
              <BookOpen size={16} />
            </button>
            <button
              onClick={() => handleEdit(row.original)}
              className="rounded p-1 text-blue-600 hover:bg-blue-100"
              title="Edit Course"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="rounded p-1 text-red-600 hover:bg-red-100"
              title="Delete Course"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const data = useMemo(() => courses || [], [courses]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const handleAddNew = () => {
    setCurrentCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  // Function to handle viewing modules for a course
  const handleViewModules = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModules(true);
  };

  // Function to go back to courses view
  const handleBackToCourses = () => {
    setShowModules(false);
    setSelectedCourseId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const courseData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      status: formData.get('status'),
      image: formData.get('image').size > 0 ? formData.get('image') : null,
    };

    if (currentCourse) {
      updateCourse({ ...courseData, id: currentCourse.id });
    } else {
      createCourse(courseData);
    }
    setIsModalOpen(false);
  };

  if (isLoadingCourses) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-lg text-gray-500">Loading courses...</div>
      </div>
    );
  }

  if (showModules) {
    // Show the ModulesDataTable when a course is selected
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Modules for Course: {courses.find(c => c.id === selectedCourseId)?.title || 'Course'}
          </h2>
          <button
            onClick={handleBackToCourses}
            className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Back to Courses
          </button>
        </div>
        <ModulesDataTable courseId={selectedCourseId} />
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search courses..."
              className="rounded-lg border border-gray-300 pl-8 py-2 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap px-6 py-4">
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
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              data.length
            )}
          </span>{' '}
          of <span className="font-medium">{data.length}</span> courses
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from(
            { length: table.getPageCount() },
            (_, pageIndex) => pageIndex + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => table.setPageIndex(pageNumber - 1)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                table.getState().pagination.pageIndex === pageNumber - 1
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              {currentCourse ? 'Edit Course' : 'Add New Course'}
            </h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={currentCourse?.title || ''}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={currentCourse?.description || ''}
                  rows="3"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={currentCourse?.price || ''}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={currentCourse?.status || 'Opened'}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Opened">Opened</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Course Image
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                {currentCourse?.image && (
                  <div className="mt-2 flex items-center">
                    <div className="mr-2 h-12 w-12 overflow-hidden rounded">
                      <img
                        src={currentCourse.image}
                        alt="Current"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-500">Current image</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {currentCourse ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}