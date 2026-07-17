import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className="min-h-screen bg-background text-on-background p-8 flex flex-col items-center justify-center">
                <h1 className="text-display text-primary font-bold">Graphodo</h1>
                <p className="text-body-lg mt-4 mb-8">Master Your Time, Visualize Your Growth</p>
                <div className="flex gap-4">
                  <Link to="/login" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Sign In</Link>
                  <Link to="/register" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-on-background hover:bg-surface transition-colors">Sign Up</Link>
                </div>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Future routes */}
                <Route path="/tasks" element={<div className="p-4">Tasks Coming Soon</div>} />
                <Route path="/calendar" element={<div className="p-4">Calendar Coming Soon</div>} />
                <Route path="/analytics" element={<div className="p-4">Analytics Coming Soon</div>} />
                <Route path="/settings" element={<div className="p-4">Settings Coming Soon</div>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
