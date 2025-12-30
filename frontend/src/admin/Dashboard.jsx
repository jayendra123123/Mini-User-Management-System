
import React from 'react';
import StatsCard from './StatsCard';
import UserGrowthChart from './UserGrowthChart';
import RoleDistribution from './RoleDistribution';
import RecentUsersTable from './RecentUsersTable';

// const STATS = [
//   { label: 'Total Users', value: '1,240', trend: '+5%', trendUp: true, icon: 'group', colorClass: 'bg-primary/10 text-primary' },
//   { label: 'Active Users', value: '342', trend: '+1.2%', trendUp: true, icon: 'check_circle', colorClass: 'bg-blue-100 text-blue-600' },
//   { label: 'Pending Requests', value: '12', trend: '-2%', trendUp: false, icon: 'pending', colorClass: 'bg-orange-100 text-orange-600' },
//   { label: 'Banned Users', value: '5', trend: '0%', trendUp: true, icon: 'block', colorClass: 'bg-slate-100 text-slate-600' },
// ];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Heading & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">System performance and user statistics overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Invite User
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserGrowthChart />
        <RoleDistribution />
      </div>

      {/* Table Section */}
      <RecentUsersTable />
    </div>
  );
};

export default Dashboard;
