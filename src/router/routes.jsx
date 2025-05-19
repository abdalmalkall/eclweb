import { lazy } from 'react';
import PublicLayout from '@/components/layouts/PublicLayout/PublicLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout/DashboardLayout';

import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminRoute from '@/components/common/AdminRoute';


// Public
const Home = lazy(() => import('@/pages/public/Home/Home'));
const Courses = lazy(() => import('@/pages/public/Course/Courses'));
const CourseDetails = lazy(() => import('@/pages/public/Course/CourseDetails'));

const CourseSelector = lazy(() => import('@/pages/public/CourseSelector/CourseSelector'));
const FAQ = lazy(() => import('@/pages/public/FAQ/FAQ'));
const AboutUS = lazy(() => import('@/pages/public/AboutUS/AboutUS'));
const ContactUS = lazy(() => import('@/pages/public/ContactUS/ContactUS'));
const Pricing = lazy(() => import('@/pages/public/Pricing/Pricing'));

// Auth
const SignUp = lazy(() => import('@/pages/public/SignUp'));
const Login = lazy(() => import('@/pages/public/Login'));
// Dash
const HomeDashboard = lazy(() => import('@/pages/dashboard/HomeDashboard'));
const ManagementCategory = lazy(() => import('@/pages/dashboard/ManagementCategory'));
const CoursesPage = lazy(() => import('@/pages/dashboard/Courses/CoursesPage'));
const UsersAdmin = lazy(() => import('@/pages/dashboard/Users/UsersAdmin'));
const ModulesDataTable = lazy(() => import('@/pages/dashboard/Modules/ModulesDataTable'));
const NotificationSettings = lazy(() => import('@/components/NotificationSettings'));
const PricingPlans = lazy(() => import('@/pages/dashboard/Pricing/PricingPlans'));



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
      { path: 'Course-Selector', element: <CourseSelector /> },
      { path: 'Courses', element: <Courses /> },
      {
        path: 'Courses/:id', element:
          <CourseDetails />
      },
      { path: 'pricing', element: <Pricing /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'contact', element: <ContactUS /> },
      { path: 'about', element: <AboutUS /> },
      // Auth
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },
    ],
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
      {
        path: 'pricing-plans', element:
          <AdminRoute>
            <PricingPlans />
          </AdminRoute>
      },
      {
        path: 'notifications/settings', element:
          <AdminRoute>
            <NotificationSettings />
          </AdminRoute>

      },
      {
        path: 'users', element:
          <UsersAdmin />
      },
      {
        path: 'modules-page', element:
          <ModulesDataTable />
      },

      {
        path: 'courses-page', element:
          <CoursesPage />
      },




    ],
  }



];


export default routes;