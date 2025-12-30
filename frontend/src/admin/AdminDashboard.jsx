import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import { getAllUsers, activateUser, deactivateUser, deleteUser, getStats } from '../services/adminService';
import { logout } from '../services/authService';
import { useToast } from '../component/ToastContext';

const AdminDashboard = ({ user, onLogout }) => {
  const toast = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    adminUsers: 0,
    newUsersThisWeek: 0
  });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync user data to localStorage on mount
  useEffect(() => {
    if (user && user.role) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...storedUser, ...user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [pagination.page, pagination.limit, searchQuery, filterRole]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };

      if (searchQuery) params.search = searchQuery;
      if (filterRole !== 'all') params.role = filterRole;

      const response = await getAllUsers(params);
      
      setUsers(response.users);
      setPagination(prev => ({
        ...prev,
        total: response.total,
        pages: response.pages
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch users', 4000);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const statsData = await getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch statistics', 4000);
    }
  };

  const statsDisplay = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: 'group', color: 'bg-sky-500', change: '+12%' },
    { label: 'Active Users', value: stats.activeUsers || 0, icon: 'trending_up', color: 'bg-sky-600', change: '+5%' },
    { label: 'Admins', value: stats.adminUsers || 0, icon: 'admin_panel_settings', color: 'bg-sky-700', change: '+2' },
    { label: 'New This Week', value: stats.newUsersThisWeek || 0, icon: 'person_add', color: 'bg-sky-400', change: '+3' },
  ];

  const handleToggleStatus = async (userId) => {
    try {
      const userToToggle = users.find(u => u._id === userId);
      
      if (userToToggle.status === 'Active') {
        await deactivateUser(userId);
      } else {
        await activateUser(userId);
      }
      
      // Refresh users
      await fetchUsers();
      await fetchStats();
      toast.success('User status updated successfully');
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error(error.response?.data?.message || 'Failed to update user status', 5000);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        await fetchUsers();
        await fetchStats();
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error(error.response?.data?.message || 'Failed to delete user', 5000);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed, clearing session...', 3000);
      onLogout(); // Logout anyway on frontend
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background-dark overflow-hidden">
      {/* Left Sidebar - Desktop */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1a232d] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center mr-3">
            <span className="material-symbols-outlined text-white text-[22px]">admin_panel_settings</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'users', label: 'Users', icon: 'group' },
              { id: 'settings', label: 'Settings', icon: 'settings' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info */}
        
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-[#1a232d] border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">menu</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                title="Toggle theme"
              >
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-white text-[20px]">person</span>
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.fullName}</p>
                    <p className="text-xs text-sky-600 dark:text-sky-400">Admin</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {activeTab === 'overview' && (
            <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsDisplay.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-[#1a232d] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-white text-[28px]">{stat.icon}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{stat.change}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Users Preview */}
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-[#1a232d]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-[24px]">groups</span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Users</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
              </div>
              <UserTable 
                users={users.slice(0, 3)} 
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            </div>
          </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPagination(prev => ({ ...prev, page: 1 }));
                    }}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterRole}
                    onChange={(e) => {
                      setFilterRole(e.target.value);
                      setPagination(prev => ({ ...prev, page: 1 }));
                    }}
                    className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button 
                    onClick={() => { fetchUsers(); fetchStats(); }}
                    className="px-4 sm:px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 touch-manipulation"
                    title="Refresh data"
                  >
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-[#1a232d]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-[24px]">group</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Users ({pagination.total})</h2>
                </div>
              </div>
              {loading ? (
                <div className="p-12 text-center text-gray-500">Loading users...</div>
              ) : (
                <UserTable 
                  users={users} 
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                />
              )}
            </div>
            </div>
          )}

            {activeTab === 'settings' && (
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[24px]">settings</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-sky-500 text-[20px]">mail</span>
                  Admin Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium cursor-not-allowed"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-sky-500 text-[20px]">admin_panel_settings</span>
                  Account Role
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-sky-300 dark:border-sky-600 rounded-xl bg-sky-50 dark:bg-sky-900/20">
                  <span className="inline-block w-3 h-3 rounded-full bg-sky-500"></span>
                  <span className="text-gray-900 dark:text-white font-bold">Admin</span>
                </div>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
