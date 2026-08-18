import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Tasks', path: '/tasks', icon: 'check_circle' },
    { name: 'Habits', path: '/habits', icon: 'repeat' },
    { name: 'Calendar', path: '/calendar', icon: 'calendar_month' },
    { name: 'Analytics', path: '/analytics', icon: 'leaderboard' },
    { name: 'Profile', path: '/profile', icon: 'person' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md text-body-md overflow-x-hidden">
      {/* Sidebar Shell */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-md px-sm z-50">
        <div className="mb-xl px-md">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">GRAPHODO</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-xs">Productivity Platform</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-md py-md rounded-lg transition-colors active:scale-[0.98] duration-150 ${
                  isActive
                    ? 'text-primary font-semibold border-r-2 border-primary bg-surface-container-high'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined mr-md ${isActive ? 'filled-icon' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-md pb-md">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-md py-md rounded-lg text-error hover:bg-error/10 transition-colors mb-2"
          >
            <span className="material-symbols-outlined mr-md">logout</span>
            <span>Log Out</span>
          </button>
          <button className="w-full bg-primary-container text-on-primary-container py-md px-md rounded-xl font-semibold flex items-center justify-center gap-sm shadow-sm active:scale-95 transition-transform">
            <span className="material-symbols-outlined">add</span>
            New Task
          </button>
        </div>
      </aside>

      {/* Top Navigation */}
      <header className="flex justify-between items-center h-16 px-gutter ml-64 bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant shadow-sm">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full focus-within:ring-2 focus-within:ring-primary/20 rounded-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              className="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-md py-2 focus:ring-0 text-body-md outline-none" 
              placeholder="Search across Graphodo..." 
            />
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
              <span className="material-symbols-outlined">contrast</span>
            </button>
          </div>
          <div className="h-6 w-[1px] bg-outline-variant mx-xs"></div>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-all font-semibold">Help</a>
          <button className="bg-primary text-on-primary px-md py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all">Upgrade</button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 p-gutter max-w-screen-2xl mx-auto">
        <Outlet />
      </main>
      
      {/* Floating Action Feedback Area (Toast Placeholder) */}
      <div className="fixed bottom-lg right-lg z-50 flex flex-col gap-sm" id="toast-container"></div>
    </div>
  );
};

export default AppLayout;
