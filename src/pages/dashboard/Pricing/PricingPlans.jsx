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
import { usePricingPlans } from '@/hooks/usePricingPlans';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PricingPlansPage() {
  const {
    pricingPlans,
    isLoadingPricingPlans,
    createPricingPlan,
    updatePricingPlan,
    deletePricingPlan
  } = usePricingPlans();

  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const formRef = useRef(null);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('rowIndex', {
        header: '#',
        cell: ({ row }) => row.index + 1,
        size: 50,
      }),
      columnHelper.accessor('name', {
        header: 'Plan Name',
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
      columnHelper.accessor('allowed_courses', {
        header: 'Allowed Courses',
        cell: ({ getValue }) => <div>{getValue()}</div>,
      }),
      columnHelper.accessor('duration_days', {
        header: 'Duration (Days)',
        cell: ({ getValue }) => <div>{getValue()}</div>,
      }),
      columnHelper.accessor('is_active', {
        header: 'Status',
        cell: ({ getValue }) => {
          const isActive = getValue();
          return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${
              isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {isActive ? 'Active' : 'Inactive'}
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
              onClick={() => handleEdit(row.original)}
              className="rounded p-1 text-blue-600 hover:bg-blue-100"
              title="Edit Plan"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="rounded p-1 text-red-600 hover:bg-red-100"
              title="Delete Plan"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const data = useMemo(() => pricingPlans || [], [pricingPlans]);

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
    setCurrentPlan(null);
    setIsModalOpen(true);
  };

  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pricing plan?')) {
      deletePricingPlan(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const planData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      allowed_courses: formData.get('allowed_courses'),
      duration_days: formData.get('duration_days'),
      is_active: formData.get('is_active') === 'true',
    };

    if (currentPlan) {
      updatePricingPlan({ ...planData, id: currentPlan.id });
    } else {
      createPricingPlan(planData);
    }
    setIsModalOpen(false);
  };

  if (isLoadingPricingPlans) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-lg text-gray-500">Loading pricing plans...</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Pricing Plans</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search plans..."
              className="rounded-lg border border-gray-300 pl-8 py-2 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} /> Add Plan
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
                  No pricing plans found
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
          of <span className="font-medium">{data.length}</span> plans
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
              {currentPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
            </h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Plan Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={currentPlan?.name || ''}
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
                  defaultValue={currentPlan?.description || ''}
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
                    defaultValue={currentPlan?.price || ''}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="is_active"
                    defaultValue={currentPlan?.is_active ? 'true' : 'false'}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Allowed Courses
                  </label>
                  <input
                    name="allowed_courses"
                    type="number"
                    min="0"
                    defaultValue={currentPlan?.allowed_courses || ''}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Duration (Days)
                  </label>
                  <input
                    name="duration_days"
                    type="number"
                    min="1"
                    defaultValue={currentPlan?.duration_days || ''}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
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
                  {currentPlan ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}