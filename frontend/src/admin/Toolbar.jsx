
import React from 'react';

const Toolbar = ({ 
  searchQuery, onSearchChange, 
  roleFilter, onRoleChange, 
  statusFilter, onStatusChange 
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
      <div className="flex-1 min-w-[280px]">
        <div className="relative flex items-center w-full h-10 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
          <div className="absolute left-3 flex items-center pointer-events-none text-text-secondary dark:text-slate-400">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
          </div>
          <input 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-full pl-10 pr-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-white placeholder:text-text-secondary focus:outline-none focus:border-primary text-sm" 
            placeholder="Search users by name, email, or ID..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-3">
        <div className="relative min-w-[140px]">
          <select 
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full h-10 pl-3 pr-8 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer"
          >
            <option value="All">Role: All</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary dark:text-slate-400 flex items-center">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_drop_down</span>
          </div>
        </div>

        <div className="relative min-w-[140px]">
          <select 
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full h-10 pl-3 pr-8 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-main dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary dark:text-slate-400 flex items-center">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_drop_down</span>
          </div>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm active:scale-95">
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
        Add User
      </button>
    </div>
  );
};

export default Toolbar;
