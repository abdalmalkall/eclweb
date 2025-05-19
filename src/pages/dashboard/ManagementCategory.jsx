import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryTable from '@/components/categories/CategoryTable';
import { NotificationProvider } from '@/contexts/NotificationContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const ManagementCategory = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>

        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow rounded-lg p-6">
                  <CategoryTable />
                </div>
              </div>
            </div>
          </main>
        </div>
      </NotificationProvider>

    </QueryClientProvider>

  );
};

export default ManagementCategory;
