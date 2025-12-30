
import React from 'react';

const StatsCards = ({ total, active, admins }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary dark:text-slate-400 text-sm font-medium">Total Users</p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg" style={{ fontSize: '20px' }}>group</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-text-main dark:text-white text-2xl font-bold">{total.toLocaleString()}</p>
          <span className="text-[#078838] bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded text-xs font-medium">+5%</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary dark:text-slate-400 text-sm font-medium">Active Users</p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg" style={{ fontSize: '20px' }}>person_check</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-text-main dark:text-white text-2xl font-bold">{active.toLocaleString()}</p>
          <span className="text-text-secondary dark:text-slate-500 text-xs font-medium">Last 30 days</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary dark:text-slate-400 text-sm font-medium">Admins</p>
          <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg" style={{ fontSize: '20px' }}>shield_person</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-text-main dark:text-white text-2xl font-bold">{admins}</p>
          <span className="text-[#078838] bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded text-xs font-medium">+2%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
