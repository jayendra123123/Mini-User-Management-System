
import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import ActivityTable from './ActivityTable';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'profile', label: 'My Profile', icon: 'person' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
];

const STATS = [
  { 
    label: 'Days Active', 
    value: 124, 
    icon: 'calendar_month', 
    trend: 'Consecutive Login Streak', 
    colorClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
  },
  { 
    label: 'Tasks Completed', 
    value: 18, 
    icon: 'check_circle', 
    subtext: 'This month', 
    colorClass: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
  },
  { 
    label: 'Security Score', 
    value: '95%', 
    icon: 'security', 
    progress: 95, 
    colorClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
  },
];

const ACTIVITIES = [
  { id: '1', action: 'User Login', status: 'Success', date: 'Today, 09:41 AM', ip: '192.168.1.1' },
  { id: '2', action: 'Update Profile', status: 'Updated', date: 'Yesterday, 4:20 PM', ip: '192.168.1.1' },
  { id: '3', action: 'Password Reset', status: 'Pending', date: 'Oct 24, 2023', ip: '192.168.1.1' },
  { id: '4', action: 'Document Upload', status: 'Success', date: 'Oct 20, 2023', ip: '192.168.1.1' },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background-dark overflow-hidden">
      {/* Left Sidebar - Desktop */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-dark border-r border-[#e5e7eb] dark:border-[#2a3642] transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#f0f2f4] dark:border-[#2a3642]">
          <div className="size-9 text-primary flex items-center justify-center rounded-lg bg-primary/10 mr-3">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '22px' }}>grid_view</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#111418] dark:text-white">UserManage</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-2 px-2 text-xs font-semibold text-[#617589] dark:text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 mb-2 px-2 text-xs font-semibold text-[#617589] dark:text-slate-400 uppercase tracking-wider">
            Support
          </div>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-all">
              <span className="material-symbols-outlined text-[22px]">help</span>
              <span className="font-semibold">Help Center</span>
            </button>
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-[#f0f2f4] dark:border-[#2a3642]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px]">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#111418] dark:text-white truncate">Alex Johnson</p>
              <p className="text-xs text-[#617589] dark:text-slate-400">Standard User</p>
            </div>
          </div>
        </div>
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
        <header className="h-16 bg-white dark:bg-surface-dark border-b border-[#e5e7eb] dark:border-[#2a3642] shadow-sm">
          <div className="h-full px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-all"
              >
                <span className="material-symbols-outlined text-[#617589] dark:text-slate-400">menu</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#111418] dark:text-white">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'profile' && 'My Profile'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-all"
                title="Toggle theme"
              >
                <span className="material-symbols-outlined text-[#617589] dark:text-slate-400">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            
            {activeTab === 'overview' && (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight mb-2">Welcome back, Alex</h1>
                <p className="text-[#617589] dark:text-slate-400 text-base">Here's what's happening with your account today.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-[#dbe0e6] dark:border-[#334155] rounded-lg text-[#111418] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#25303d] transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                  <span>Export Data</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-primary/80 to-purple-600/80" />
                  <div className="px-6 pb-6 relative">
                    <div className="-mt-12 mb-4">
                      <div 
                        className="size-24 rounded-full border-4 border-white dark:border-surface-dark bg-cover bg-center" 
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmwU7A_sTO22RKuH8ZdXWpDCT8mKauS9M2I0YCgJfAnq2h9sG4EHMZ8Lb6X8W1mUU84UBqGBk4Kz4b9YpJPUU-1-XpiCOwzqB0-ifiEVygq8JQ1f2Smar2AbB1UpfDJuPkkjCMmoiU5-zaQeHHdu2eeUAXXGwvd2pkKFbjJyqckqdQ_GRbTVi9Je8-47bPqlbVNp3nm-JBLtVZZALcsc7YAlTA2KaQYSivTA3abFIchNQ2H1p-0btVaL3FBsvkc4K6NPJnLM5wpe4R")' }}
                      />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#111418] dark:text-white">Alex Johnson</h3>
                        <p className="text-[#617589] dark:text-slate-400">Standard User</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-800">
                        Active
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-3 py-4 border-t border-[#f0f2f4] dark:border-[#2a3642]">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#617589] dark:text-slate-500">mail</span>
                        <span className="text-[#111418] dark:text-slate-200">alex.j@example.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#617589] dark:text-slate-500">location_on</span>
                        <span className="text-[#111418] dark:text-slate-200">San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-[#617589] dark:text-slate-500">calendar_today</span>
                        <span className="text-[#111418] dark:text-slate-200">Joined Jan 2023</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-2 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                      <span className="material-symbols-outlined text-lg">edit_square</span>
                      Edit Profile
                    </button>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm p-6">
                  <h4 className="text-base font-bold text-[#111418] dark:text-white mb-4">Account Storage</h4>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-bold text-[#111418] dark:text-white">75</span>
                    <span className="text-sm text-[#617589] dark:text-slate-400 mb-1">/ 100 GB</span>
                  </div>
                  <div className="w-full bg-[#f0f2f4] dark:bg-[#25303d] rounded-full h-2 mb-4">
                    <div className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-[#617589] dark:text-slate-500">
                    75% of your storage used. <a className="text-primary hover:underline" href="#">Upgrade Plan</a>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Password', icon: 'lock_reset' },
                      { label: 'Permissions', icon: 'verified_user' },
                      { label: 'Logs', icon: 'history' },
                      { label: 'Support', icon: 'support_agent' }
                    ].map((action) => (
                      <button 
                        key={action.label} 
                        className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#dbe0e6] dark:border-[#2a3642] hover:border-primary/50 hover:shadow-md transition-all group active:scale-95"
                      >
                        <div className="p-3 bg-[#f0f2f4] dark:bg-[#25303d] rounded-full group-hover:bg-primary/10 transition-colors text-[#111418] dark:text-white group-hover:text-primary">
                          <span className="material-symbols-outlined">{action.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-[#111418] dark:text-white">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <ActivityTable activities={ACTIVITIES} />
              </div>
            </div>
            </>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[24px]">person</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#111418] dark:text-white">My Profile</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-surface-dark bg-cover bg-center shadow-lg" 
                      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmwU7A_sTO22RKuH8ZdXWpDCT8mKauS9M2I0YCgJfAnq2h9sG4EHMZ8Lb6X8W1mUU84UBqGBk4Kz4b9YpJPUU-1-XpiCOwzqB0-ifiEVygq8JQ1f2Smar2AbB1UpfDJuPkkjCMmoiU5-zaQeHHdu2eeUAXXGwvd2pkKFbjJyqckqdQ_GRbTVi9Je8-47bPqlbVNp3nm-JBLtVZZALcsc7YAlTA2KaQYSivTA3abFIchNQ2H1p-0btVaL3FBsvkc4K6NPJnLM5wpe4R")' }}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#617589] dark:text-slate-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        value="Alex Johnson"
                        className="w-full p-3 border-2 border-[#dbe0e6] dark:border-[#2a3642] rounded-lg bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#617589] dark:text-slate-400 mb-2">Email</label>
                      <input
                        type="email"
                        value="alex.j@example.com"
                        className="w-full p-3 border-2 border-[#dbe0e6] dark:border-[#2a3642] rounded-lg bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#617589] dark:text-slate-400 mb-2">Location</label>
                      <input
                        type="text"
                        value="San Francisco, CA"
                        className="w-full p-3 border-2 border-[#dbe0e6] dark:border-[#2a3642] rounded-lg bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <button className="px-6 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[24px]">settings</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#111418] dark:text-white">Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111418] dark:text-white mb-4">Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#617589] dark:text-slate-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full p-3 border-2 border-[#dbe0e6] dark:border-[#2a3642] rounded-lg bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#617589] dark:text-slate-400 mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full p-3 border-2 border-[#dbe0e6] dark:border-[#2a3642] rounded-lg bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                      <button className="px-6 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-[#dbe0e6] dark:border-[#2a3642]">
                    <h3 className="text-lg font-semibold text-[#111418] dark:text-white mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-[#f0f2f4] dark:bg-[#25303d] rounded-lg">
                        <span className="text-[#111418] dark:text-white font-medium">Email Notifications</span>
                        <input type="checkbox" className="w-5 h-5 text-primary" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-[#f0f2f4] dark:bg-[#25303d] rounded-lg">
                        <span className="text-[#111418] dark:text-white font-medium">Security Alerts</span>
                        <input type="checkbox" className="w-5 h-5 text-primary" defaultChecked />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
