
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { week: 'Week 1', users: 400 },
  { week: 'Week 2', users: 700 },
  { week: 'Week 3', users: 950 },
  { week: 'Week 4', users: 1240 },
];

const UserGrowthChart = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">User Growth</h3>
          <p className="text-sm text-slate-500">New user registrations over last 30 days</p>
        </div>
        <select className="bg-slate-50 border-none text-xs font-medium rounded-lg text-slate-700 py-2 pl-3 pr-8 focus:ring-1 focus:ring-primary shadow-sm">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#137fec" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="week" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#94a3b8' }} 
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#137fec" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorUsers)" 
              dot={{ r: 4, fill: '#fff', stroke: '#137fec', strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
