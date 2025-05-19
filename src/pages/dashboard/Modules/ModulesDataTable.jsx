import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useModules } from '@/hooks/useModules';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Loader } from 'lucide-react';

export default function ModulesDataTable({ courseId }) {
  const {
    modules,
    isLoading,
    addModule,
    updateModule,
    deleteModule,
    isProcessingModule,
  } = useModules(courseId);

  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const formRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: '#',
        cell: ({ row }) => row.index + 1,
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: 'order',
        header: ({ column }) => {
          return (
            <div className="flex items-center">
              <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex items-center"
              >
                Order
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp className="ml-1 h-4 w-4" />
                ) : column.getIsSorted() === "desc" ? (
                  <ArrowDown className="ml-1 h-4 w-4" />
                ) : null}
              </button>
            </div>
          );
        },
        cell: ({ getValue }) => <div className="text-center">{getValue()}</div>,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => {
          return (
            <div className="flex items-center">
              <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex items-center"
              >
                Title
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp className="ml-1 h-4 w-4" />
                ) : column.getIsSorted() === "desc" ? (
                  <ArrowDown className="ml-1 h-4 w-4" />
                ) : null}
              </button>
            </div>
          );
        },
        cell: ({ getValue }) => <div className="font-medium">{getValue()}</div>,
      },
      {
        accessorKey: 'content',
        header: 'Content',
        cell: ({ getValue }) => {
          const content = getValue();
          return (
            <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {content.length > 100 ? `${content.substring(0, 100)}...` : content}
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'created_at',
        header: ({ column }) => {
          return (
            <div className="flex items-center">
              <button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="flex items-center"
              >
                Created At
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp className="ml-1 h-4 w-4" />
                ) : column.getIsSorted() === "desc" ? (
                  <ArrowDown className="ml-1 h-4 w-4" />
                ) : null}
              </button>
            </div>
          );
        },
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return <div>{date.toLocaleDateString()}</div>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const module = row.original;
          const isProcessing = isProcessingModule(module.id);
          
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(module)}
                disabled={isProcessing}
                className="rounded p-1 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
              >
                {isProcessing ? <Loader size={16} className="animate-spin" /> : <Edit size={16} />}
              </button>
              <button
                onClick={() => handleDelete(module.id)}
                disabled={isProcessing}
                className="rounded p-1 text-red-600 hover:bg-red-100 disabled:opacity-50"
              >
                {isProcessing ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [isProcessingModule]
  );

  const data = useMemo(() => modules || [], [modules]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: { pageSize: 5 },
      sorting: [{ id: 'order', desc: false }],
    },
  });

  const handleAddNew = () => {
    setCurrentModule(null);
    setIsModalOpen(true);
  };

  const handleEdit = (module) => {
    setCurrentModule(module);
    setIsModalOpen(true);
  };

  const handleDelete = (moduleId) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      deleteModule(moduleId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    const moduleData = {
      title: formData.get('title'),
      content: formData.get('content'),
      order: parseInt(formData.get('order')),
    };

    if (currentModule) {
      updateModule({ ...moduleData, id: currentModule.id });
    } else {
      addModule(moduleData);
    }
    
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="flex items-center text-lg text-gray-500">
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Loading modules...
        </div>
      </div>
    );
  }

  if (!courseId) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg text-gray-500">Please select a course to view its modules</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Course Modules</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search modules..."
              className="rounded-lg border border-gray-300 pl-8 py-2 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Add Module
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
                  No modules found
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
          of <span className="font-medium">{data.length}</span> modules
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
            { length: Math.min(table.getPageCount(), 5) },
            (_, i) => {
              const pageIndex = i;
              const isCurrentPage = table.getState().pagination.pageIndex === pageIndex;
              
              return (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                    isCurrentPage
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageIndex + 1}
                </button>
              );
            }
          )}
          
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
              {currentModule ? 'Edit Module' : 'Add New Module'}
            </h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={currentModule?.title || ''}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  name="content"
                  defaultValue={currentModule?.content || ''}
                  rows="5"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Order
                </label>
                <input
                  name="order"
                  type="number"
                  min="1"
                  defaultValue={currentModule?.order || modules.length + 1}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  This determines the display order of the module in the course
                </p>
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
                  {currentModule ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}