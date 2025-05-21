import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calculator } from './components/Calculator';
import { AdminLayout } from './components/admin/AdminLayout';
import { MicroInverters } from './components/admin/MicroInverters';
import { CalculationEngine } from './components/admin/CalculationEngine';
import { Forms } from './components/admin/Forms';
import { Settings } from './components/admin/Settings';
import { Users } from './components/admin/Users';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }>
                  <Route index element={<Navigate to="/admin/micro-inverters" replace />} />
                  <Route path="micro-inverters" element={<MicroInverters />} />
                  <Route path="calculation-engine" element={<CalculationEngine />} />
                  <Route path="forms" element={<Forms />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;