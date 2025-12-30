
import React from 'react';

const ActivityTable = ({ activities }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Updated':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'Pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400';
      case 'Error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm flex flex-col flex-1 overflow-hidden">
      <div className="p-6 border-b border-[#f0f2f4] dark:border-[#2a3642] flex justify-between items-center">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white">Recent Activity</h3>
        <a className="text-sm font-medium text-primary hover:text-blue-600 transition-colors" href="#">View All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#617589] dark:text-slate-400">
          <thead className="bg-[#f0f2f4] dark:bg-[#25303d] text-xs uppercase font-semibold text-[#111418] dark:text-white">
            <tr>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f2f4] dark:divide-[#2a3642]">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-[#25303d]/50 transition-colors">
                <td className="px-6 py-4 font-medium text-[#111418] dark:text-slate-200">
                  {activity.action}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4">{activity.date}</td>
                <td className="px-6 py-4 font-mono text-xs">{activity.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-[#f0f2f4] dark:border-[#2a3642] text-center lg:text-left">
        <button className="text-sm font-medium text-[#617589] dark:text-slate-400 hover:text-[#111418] dark:hover:text-white transition-colors">
          Show more history
        </button>
      </div>
    </div>
  );
};

export default ActivityTable;
