import { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useUsers } from '@/hooks/useUsers';
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, UserPlus, UserCog, Eye, EyeOff } from 'lucide-react';

export default function UsersAdmin() {
  const {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser,
    isProcessingUser
  } = useUsers();

  const [globalFilter, setGlobalFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        header: 'Name',
        cell: ({ getValue }) => <div className="font-medium">{getValue()}</div>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => getValue(),
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ getValue }) => {
          const role = getValue();
          const getRoleBadgeStyle = () => {
            switch (role?.toLowerCase()) {
              case 'admin':
                return 'bg-purple-100 text-purple-800';
              case 'manager':
                return 'bg-blue-100 text-blue-800';
              case 'editor':
                return 'bg-green-100 text-green-800';
              case 'user':
                return 'bg-gray-100 text-gray-800';
              default:
                return 'bg-gray-100 text-gray-800';
            }
          };
          return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleBadgeStyle()}`}>
              {role || 'User'}
            </span>
          );
        },
      }),
      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: ({ getValue }) => {
          const date = getValue() ? new Date(getValue()) : null;
          return date ? new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(date) : 'N/A';
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              disabled={isProcessingUser(row.original.id)}
              className="rounded p-1 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              disabled={isProcessingUser(row.original.id)}
              className="rounded p-1 text-red-600 hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    [isProcessingUser]
  );

  const data = useMemo(() => users || [], [users]);

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
      pagination: { pageSize: 10 },
    },
  });

  const handleAddNew = () => {
    setCurrentUser(null);
    setShowPassword(true);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    };
    
    // Only include password if it's provided and not empty
    const password = formData.get('password');
    if (password) {
      userData.password = password;
    }

    if (currentUser) {
      updateUser({ ...userData, id: currentUser.id });
    } else {
      addUser(userData);
    }
    
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="text-lg text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search users..."
              className="rounded-lg border border-gray-300 pl-8 py-2 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <UserPlus size={16} /> Add User
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
                  No users found
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
          of <span className="font-medium">{data.length}</span> users
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
            { length: Math.min(5, table.getPageCount()) },
            (_, i) => {
              const pageIndex = table.getState().pagination.pageIndex;
              let startPage = Math.max(0, pageIndex - 2);
              let endPage = Math.min(table.getPageCount() - 1, startPage + 4);
              
              if (endPage - startPage < 4) {
                startPage = Math.max(0, endPage - 4);
              }
              
              return startPage + i;
            }
          ).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                table.getState().pagination.pageIndex === pageIndex
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageIndex + 1}
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
              {currentUser ? (
                <div className="flex items-center">
                  <UserCog className="mr-2" size={20} />
                  Edit User
                </div>
              ) : (
                <div className="flex items-center">
                  <UserPlus className="mr-2" size={20} />
                  Add New User
                </div>
              )}
            </h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={currentUser?.name || ''}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={currentUser?.email || ''}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={currentUser?.role || 'student'}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="trainer">trainer</option>
                  <option value="student">student</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>
                    {currentUser ? 'Password (leave blank to keep current)' : 'Password'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  required={!currentUser}
                  minLength={currentUser ? 0 : 6}
                />
                {!currentUser && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 6 characters
                  </p>
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
                  {currentUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}