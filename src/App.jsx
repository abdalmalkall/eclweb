import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './router';
import './index.css';

// إنشاء عميل React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>جاري التحميل...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
