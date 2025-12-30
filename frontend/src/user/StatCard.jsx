
import React from 'react';

const StatCard = ({ label, value, icon, trend, subtext, colorClass, progress }) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#dbe0e6] dark:border-[#2a3642] shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <p className="text-[#617589] dark:text-slate-400 text-sm font-medium">{label}</p>
      </div>
      <div>
        <p className="text-[#111418] dark:text-white text-2xl font-bold">{value}</p>
        {trend && (
          <p className="text-green-600 text-xs font-medium mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>{trend}</span>
          </p>
        )}
        {subtext && !progress && (
          <p className="text-[#617589] dark:text-slate-500 text-xs font-medium mt-1">{subtext}</p>
        )}
        {progress !== undefined && (
          <div className="w-full bg-[#f0f2f4] dark:bg-[#25303d] rounded-full h-1.5 mt-2">
            <div 
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
