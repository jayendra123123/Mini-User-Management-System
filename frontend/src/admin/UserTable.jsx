
import React from 'react';

const UserTable = ({ users, onToggleStatus, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (email, role) => {
    // Professional gradient colors based on role
    if (role === 'admin' || role === 'Admin') {
      return 'bg-gradient-to-br from-sky-500 to-sky-600';
    }
    // Generate consistent color based on email
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
      'bg-gradient-to-br from-cyan-500 to-cyan-600',
    ];
    const hash = (email || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap text-left">
        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-slate-400">User</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-slate-400">Role</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-slate-400">Status</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-slate-400">Last Login</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-slate-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light dark:divide-border-dark">
          {users.map((user) => (
            <tr key={user._id || user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Professional User Avatar Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(user.email, user.role)} flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-800`}>
                    <span className="text-white font-semibold text-sm">
                      {getInitials(user.fullName || user.name)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className={`text-sm font-semibold ${user.status === 'Inactive' ? 'text-text-secondary dark:text-slate-400' : 'text-text-main dark:text-white'}`}>
                      {user.fullName || user.name}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {user.role === 'admin' || user.role === 'Admin' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    User
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={user.status === 'Active'}
                      onChange={() => onToggleStatus(user._id || user.id)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    <span className={`ml-2 text-sm font-medium ${user.status === 'Active' ? 'text-text-main dark:text-slate-200' : 'text-text-secondary dark:text-slate-500'}`}>
                      {user.status}
                    </span>
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className={`text-sm ${user.status === 'Inactive' ? 'text-text-secondary dark:text-slate-500' : 'text-text-main dark:text-slate-300'}`}>
                  {formatDate(user.lastLogin || user.lastLoginDate)}
                </p>
                <p className={`text-xs ${user.status === 'Inactive' ? 'text-text-secondary dark:text-slate-600' : 'text-text-secondary dark:text-slate-500'}`}>
                  {formatTime(user.lastLogin || user.lastLoginTime)}
                </p>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-text-secondary dark:text-slate-400 transition-colors" title="Edit User">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                  <button 
                    onClick={() => onDelete(user._id || user.id)}
                    className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 text-text-secondary dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" 
                    title="Delete User"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-text-secondary dark:text-slate-400">
                No users found matching your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
