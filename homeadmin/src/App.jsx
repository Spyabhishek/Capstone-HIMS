import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/layout/Sidebar';
import PageLayout from './components/layout/PageLayout';
import Dashboard from './pages/Dashboard';
import Admins from './pages/admins';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Payments from './pages/Payments';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminForm from './pages/admins/AdminForm';
import PolicyForm from './pages/policies/PolicyForm';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isLoginPage = location.pathname === '/login';
    setIsSidebarVisible(isAuthenticated && !isLoginPage);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {isSidebarVisible && (
          <div className={`${isOpen ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
            <Sidebar 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
              isOpen={isOpen} 
              setIsOpen={setIsOpen} 
            />
          </div>
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PageLayout><Dashboard /></PageLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admins"
                element={
                  <AdminRoute>
                    <PageLayout><Admins /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/policies"
                element={
                  <AdminRoute>
                    <PageLayout><Policies /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/claims"
                element={
                  <AdminRoute>
                    <PageLayout><Claims /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <AdminRoute>
                    <PageLayout><Payments /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admins/new"
                element={
                  <AdminRoute>
                    <PageLayout><AdminForm /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/admins/:id/edit"
                element={
                  <AdminRoute>
                    <PageLayout><AdminForm /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/policies/new"
                element={
                  <AdminRoute>
                    <PageLayout><PolicyForm /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route
                path="/policies/:id/edit"
                element={
                  <AdminRoute>
                    <PageLayout><PolicyForm /></PageLayout>
                  </AdminRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
