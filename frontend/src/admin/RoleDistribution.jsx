
import React from 'react';

const RoleDistribution = () => {
  const roles = [
    { name: 'Admin', percentage: 12, color: 'bg-primary' },
    { name: 'Editor', percentage: 28, color: 'bg-cyan-500' },
    { name: 'Viewer', percentage: 60, color: 'bg-indigo-400' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
      <h3 className="text-lg font-bold text-slate-900 mb-1">User Roles</h3>
      <p className="text-sm text-slate-500 mb-8">Distribution by role type</p>
      
      <div className="flex-1 flex flex-col justify-center gap-8">
        {roles.map((role) => (
          <div key={role.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-slate-700">{role.name}</span>
              <span className="text-slate-500 font-medium">{role.percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className={`${role.color} h-full rounded-full transition-all duration-1000`} 
                style={{ width: `${role.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 font-medium">Total Roles</span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">3 Types</span>
        </div>
      </div>
    </div>
  );
};

export default RoleDistribution;
