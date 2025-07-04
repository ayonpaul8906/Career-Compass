import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, NavLink, Outlet, useResolvedPath, useMatch } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Lightbulb,
  Briefcase,
  Bot,
  LogOut,
  FolderKanban,
  Menu,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';

import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ email: '', username: '', photoURL: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || '';
        const username = email.split('@')[0];
        const photoURL = currentUser.photoURL || '';
        setUser({ email, username, photoURL });
      }
    });
    return () => unsubscribe();
  }, []);

  const navItems = useMemo(() => [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/quiz', label: 'Interest Quiz', icon: Lightbulb },
    { href: '/dashboard/opportunity', label: 'Opportunities', icon: Briefcase },
    { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
    { href: '/dashboard/chatbot', label: 'AI Mentor', icon: Bot },
  ], []);

  // 💡 New robust active match function
  const isNavItemActive = (path) => {
    const resolved = useResolvedPath(path);
    return useMatch({ path: resolved.pathname, end: false });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white/70 dark:bg-white/5 border-r border-gray-200 dark:border-gray-700 backdrop-blur-lg flex flex-col transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
          <Compass className="w-7 h-7 text-blue-600 dark:text-blue-500" />
          <h1 className="text-lg font-bold font-headline text-gray-900 dark:text-white">Career Compass</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive: defaultIsActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all font-medium ${
                  isNavItemActive(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Avatar>
              <AvatarImage src={user.photoURL || 'https://placehold.co/40x40.png'} alt="user" />
              <AvatarFallback>{user.username[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">{user.username}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-white/70 dark:bg-gray-900 backdrop-blur-lg">
          <h1 className="text-lg font-bold font-headline text-gray-900 dark:text-white">Career Compass</h1>
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
