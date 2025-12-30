
import React from 'react';

const StatsCard = ({ label, value, trend, trendUp, icon, colorClass }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-primary/50 transition-all cursor-default">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <div className={`p-1.5 rounded-lg ${colorClass}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded flex items-center ${
            trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
          }`}>
            <span className="material-symbols-outlined text-[14px] mr-0.5">
              {trendUp ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
