import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import { Explore } from './pages/Explore';
import { About } from './pages/About';
import { AdminPanel } from './pages/Admin/AdminPanel';
import { Dashboard as AdminDashboard } from './pages/Admin/Dashboard';
import { UploadVideo as AdminUpload } from './pages/Admin/UploadVideo';
import { ManageVideos as AdminManage } from './pages/Admin/ManageVideos';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Placeholder components for other pages
const SearchPage = () => <Explore />;
const Library = () => <div className="py-20 text-center"><h1 className="text-4xl font-black text-white">Your Premium Library</h1><p className="text-white/40 mt-2">Personal collections are coming soon.</p></div>;
const Profile = () => <div className="py-20 text-center"><h1 className="text-4xl font-black text-white">User Profile</h1><p className="text-white/40 mt-2">Encryption active. User identity verified.</p></div>;

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="upload" 
                element={
                  <ProtectedRoute>
                    <AdminUpload />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="manage" 
                element={
                  <ProtectedRoute>
                    <AdminManage />
                  </ProtectedRoute>
                } 
              />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
