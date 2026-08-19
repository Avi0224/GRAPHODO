import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/Tasks';
import Habits from './pages/Habits';
import Analytics from './pages/Analytics';
import Landing from './pages/Landing';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Future routes */}
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/calendar" element={<div className="p-4">Calendar Coming Soon</div>} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<div className="p-4">Settings Coming Soon</div>} />
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
