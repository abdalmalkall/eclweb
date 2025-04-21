import { lazy } from 'react';
import PublicLayout from '@/components/layouts/PublicLayout/PublicLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminRoute from '@/components/common/AdminRoute';


// صفحات عامة
const Home = lazy(() => import('@/pages/public/Home'));
const CoursesAndCategory = lazy(() => import('@/pages/public/CoursesAndCategory'));
const CustomerTestimonials = lazy(() => import('@/pages/public/CustomerTestimonials'));
const OurAchivements = lazy(() => import('@/pages/public/OurAchivements'));
const SignUp = lazy(() => import('@/pages/public/SignUp'));
const Login = lazy(() => import('@/pages/public/Login'));
const HomeDashboard = lazy(() => import('@/pages/dashboard/HomeDashboard'));
const ManagementCategory = lazy(() => import('@/pages/dashboard/ManagementCategory'));

const routes = [
  // Public routes
  {
    path: '/',
    element: 
    <PublicLayout />

    ,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'courses', element: <CoursesAndCategory /> },
      { path: 'achievement', element: <OurAchivements />},
      { path: 'testimonial', element: <CustomerTestimonials />},
    ],
  },

  // ahut routes
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  // dashboard routes
  {
    path: '/dashboard',
    element: 
    <ProtectedRoute>
    <DashboardLayout />
    </ProtectedRoute>

    ,
    children: [
      { index: true, element: <HomeDashboard /> },
      { path: 'category-management', element: 
        <AdminRoute>

      <ManagementCategory /> 
      </AdminRoute>

    },

      { path: 'management-course', element: 
      <HomeDashboard /> 
      },
      { path: 'management-comment', element: <HomeDashboard /> },
    ],
  }



];


export default routes;