
import React from 'react';

const Pagination = ({ total, currentPage, pageSize }) => {
  const startIdx = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark gap-4">
      <p className="text-sm text-text-secondary dark:text-slate-400">
        Showing <span className="font-semibold text-text-main dark:text-white">{startIdx}</span> to <span className="font-semibold text-text-main dark:text-white">{endIdx}</span> of <span className="font-semibold text-text-main dark:text-white">{total}</span> entries
      </p>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-secondary dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
        </button>
        <button className="flex items-center justify-center size-9 rounded-lg bg-primary text-white font-medium text-sm transition-colors shadow-sm">
          1
        </button>
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
          2
        </button>
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
          3
        </button>
        <span className="text-text-secondary dark:text-slate-500">...</span>
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-main dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors">
          5
        </button>
        <button className="flex items-center justify-center size-9 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-secondary dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
