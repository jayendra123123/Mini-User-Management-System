import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, changePassword } from '../services/userService';
import { getStats } from '../services/adminService';
import { useToast } from './ToastContext';

const UserDashboard = ({ user, onLogout }) => {
  const toast = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ fullName: '', email: '' });
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saveLoading, setSaveLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [stats, setStats] = useState({
    accountAge: 0,
    lastLogin: '',
    profileCompletion: 85,
    totalActivities: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(false);

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
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch user profile
      const response = await getProfile();
      const profileData = response.user;
      setProfile(profileData);
      
      // Update localStorage with fresh profile data including role
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...storedUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Calculate account age in days
      const accountCreated = new Date(profileData.createdAt);
      const now = new Date();
      const accountAge = Math.floor((now - accountCreated) / (1000 * 60 * 60 * 24));

      // Set user-specific stats
      setStats({
        accountAge: accountAge,
        lastLogin: profileData.lastLogin ? new Date(profileData.lastLogin).toLocaleDateString() : 'Today',
        profileCompletion: profileData.email && profileData.fullName ? 100 : 75,
        totalActivities: Math.floor(accountAge / 7) + 5 // Activities based on account age
      });

      // Mock recent activities (replace with real API when available)
      setRecentActivities([
        { user: profileData.fullName, action: 'logged in', time: 'Just now', icon: 'login' },
        { user: 'System', action: 'account created', time: new Date(profileData.createdAt).toLocaleDateString(), icon: 'person_add' },
      ]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error(error.response?.data?.message || 'Failed to load user data', 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditForm({ fullName: profile.fullName, email: profile.email });
    setIsEditing(true);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({ fullName: '', email: '' });
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(null);
    
    try {
      const response = await updateProfile(editForm);
      const updatedProfile = { ...profile, ...editForm };
      setProfile(updatedProfile);
      setIsEditing(false);
      setSaveSuccess('Profile updated successfully!');
      toast.success('Profile updated successfully!');
      
      // Update localStorage to keep data in sync
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...editForm }));
      
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update profile';
      setSaveError(errorMsg);
      toast.error(errorMsg, 5000);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      const errorMsg = 'New passwords do not match';
      setPasswordError(errorMsg);
      toast.error(errorMsg, 4000);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      const errorMsg = 'Password must be at least 6 characters';
      setPasswordError(errorMsg);
      toast.error(errorMsg, 4000);
      return;
    }

    setPasswordLoading(true);

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword
      });
      setPasswordSuccess('Password changed successfully!');
      toast.success('Password changed successfully!');
      setTimeout(() => {
        setShowResetPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordSuccess(null);
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to change password';
      setPasswordError(errorMsg);
      toast.error(errorMsg, 5000);
    } finally {
      setPasswordLoading(false);
    }
  };

  const statsDisplay = [
    { label: 'Account Age', value: `${stats.accountAge} days`, icon: 'calendar_month', color: 'bg-sky-500' },
    { label: 'Last Login', value: stats.lastLogin || 'Today', icon: 'schedule', color: 'bg-green-500' },
    { label: 'Profile Status', value: `${stats.profileCompletion}%`, icon: 'account_circle', color: 'bg-blue-500' },
    { label: 'Total Activities', value: stats.totalActivities, icon: 'history', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background-dark dark:to-[#0a0e13] transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a232d]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-white text-[24px] sm:!text-[28px]">manage_accounts</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">User Manager</h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Welcome back, <span className="font-semibold text-primary">{profile.fullName}</span></p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-600 dark:text-gray-400 hover:scale-105 active:scale-95 touch-manipulation"
                title="Toggle theme"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l-2 border-gray-300 dark:border-gray-700">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.fullName}</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className={`inline-block w-2 h-2 rounded-full ${profile.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize font-medium">{profile.role}</p>
                  </div>
                </div>
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${profile.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-primary to-blue-600'} flex items-center justify-center shadow-lg`}>
                  <span className="material-symbols-outlined text-white text-[20px] sm:text-[22px]">
                    {profile.role === 'admin' ? 'admin_panel_settings' : 'person'}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 sm:p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600 dark:text-red-400 hover:scale-105 active:scale-95 touch-manipulation"
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8 flex gap-1 sm:gap-2 bg-white dark:bg-[#1a232d] rounded-xl p-1.5 sm:p-2 shadow-md border border-gray-200 dark:border-gray-800">
          {['overview', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold capitalize transition-all rounded-lg touch-manipulation ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'settings' ? 'User Profile' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsDisplay.map((stat, index) => (
                  <div key={index} className="bg-white dark:bg-[#1a232d] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-white text-[28px]">{stat.icon}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-[#1a232d]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[24px]">history</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-[22px]">
                          {activity.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white font-medium">
                          <span className="font-bold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        chevron_right
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[24px]">settings</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                  Edit Profile
                </button>
              )}
            </div>
            
            {saveSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-600 dark:border-green-800/30 dark:bg-green-900/10 dark:text-green-400">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {saveSuccess}
              </div>
            )}
            
            {saveError && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600 dark:border-red-800/30 dark:bg-red-900/10 dark:text-red-400">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                {saveError}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                  Full Name
                </label>
                <input
                  type="text"
                  value={isEditing ? editForm.fullName : profile.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                    isEditing
                      ? 'border-primary dark:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                  Email Address
                </label>
                <input
                  type="email"
                  value={isEditing ? editForm.email : profile.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition-all ${
                    isEditing
                      ? 'border-primary dark:border-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    {profile.role === 'admin' ? 'admin_panel_settings' : 'person'}
                  </span>
                  Account Role
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <span className={`inline-block w-3 h-3 rounded-full ${profile.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                  <span className="text-gray-900 dark:text-white font-bold capitalize">{profile.role}</span>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                  Account Status
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-green-300 dark:border-green-600 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-gray-900 dark:text-white font-bold">{profile.status || 'Active'}</span>
                </div>
              </div>
              
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saveLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-br from-primary to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saveLoading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">save</span>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saveLoading}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                    Cancel
                  </button>
                </div>
              )}
              
              {!isEditing && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowResetPasswordModal(true)}
                    className="w-full px-6 py-3 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                    Reset Password
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => {
              setShowResetPasswordModal(false);
              setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
              setPasswordError(null);
              setPasswordSuccess(null);
            }}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1a232d] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-md w-full animate-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[22px]">lock_reset</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Reset Password</h3>
                </div>
                <button
                  onClick={() => {
                    setShowResetPasswordModal(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError(null);
                    setPasswordSuccess(null);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                >
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">close</span>
                </button>
              </div>
              
              {/* Modal Body */}
              <form onSubmit={handleResetPassword} className="p-6">
                {passwordSuccess && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-600 dark:border-green-800/30 dark:bg-green-900/10 dark:text-green-400">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {passwordSuccess}
                  </div>
                )}
                
                {passwordError && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600 dark:border-red-800/30 dark:bg-red-900/10 dark:text-red-400">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    {passwordError}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">key</span>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">lock_check</span>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {passwordLoading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">check</span>
                        Update Password
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetPasswordModal(false);
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setPasswordError(null);
                      setPasswordSuccess(null);
                    }}
                    disabled={passwordLoading}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
