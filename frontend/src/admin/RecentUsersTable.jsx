
import React from 'react';

const USERS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'Editor',
    status: 'Active',
    dateJoined: 'Oct 24, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsKpDqmpH_3-uSV3LjakaenWsyxZqanS-aPuuVAZCc1qzz_tcrkXVgE7MTiuZdb9HuM6M2BDa0stgZCMaqT2aS026PlbsMcR_GzQbwfsor3M192Y0If0-9sKwSbtwYAM-2yQ2gBfAfiucb7KzvVIgumHwIYkfwSq3GAulb-sE6U12rFYKl6V0blTgyQSXAKikUx0ak9sJAaWM4ijTX71YygzJZ5ndneB8hQRIp0uap7l9WBK5b2oT8o4Omc9nE9joM17l0GufpeLaf'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    role: 'Viewer',
    status: 'Pending',
    dateJoined: 'Oct 23, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP5l6JDC1gZ6JTIkXSGS8Z8z6sgsQZpVbJTebJc97v6HmXYwtLU4w0uHfF8lIrMuFek7JxRr92IRqbrsGC2Q883b_vXII1UDnhmt95-rZ9H4TlQ8uqIalcKhLETR6CuCQt-B0sCg_YXu079xGRomUO7eif47XXkEv-fVndqO4T8NUfDo5KoFH-qHJKPTt3jmAQSmD7nk1SrRcz1uZcan_VDA6-V2XvcjWrHlkEz5nuczt9SC7i9yhhwWpMCvJVN-FLYONdI9sFeBrh'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Viewer',
    status: 'Active',
    dateJoined: 'Oct 22, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClAcNs3Yb93TSIQxzd4jXaVAt4XhC7s1K8rYl8rDWZ-6kvRtVAOdNwq4365gLQ2vf45bDRdb7SaPLZbR5hU_LTslTDaw6YZ0AQi1Oq7qJSx7XW0xuN6nuD12DWAR58n_HCZ2gG7zuhlEjMYDDazTtRxSI7MkVlZQ8bFtbkJQmLiiiLQPa-Oy-4q9Msm6TwAnqZ8ltknWuVPzHYeTn30cB7vZDsxhBipPmyGedwsrsUK2tfyp2TMSLc-TqS2QNSIyI7kIp_QNLH6B2L'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@example.com',
    role: 'Admin',
    status: 'Offline',
    dateJoined: 'Oct 21, 2023',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1tkLGd5BAjbnOh1GEMy5WUxrvcslB6uQfPLsTFdrL0Oie8BgLsHwDz6cgtJj7Sjp2nUJLhzeXh2alNCFFTKOfGXWTVJgo3qHEGTcrq2QUFXll9jpqoylAdO8IPKrJVs7kEoYdZgf25jJEUSDaUJkLn3YovUb2XeKBaWWAlLjZ4v_FEX3uJtLUdUbgHAVYthllKznSWtQw_-2q98nfCYRPpKniosYHzEEL8G5R-azsl1PeLvK4-5KJMzkIuKPWrlDbF7GnJ_hqKHkc'
  }
];

const RecentUsersTable = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Registrations</h3>
          <p className="text-sm text-slate-500">Latest users joined this week</p>
        </div>
        <button className="text-primary text-sm font-bold hover:underline transition-all">
          View All Users
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">User</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Role</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date Joined</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-slate-100 shadow-sm"
                      style={{ backgroundImage: `url(${user.avatar})` }}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">
                      {user.role === 'Admin' ? 'admin_panel_settings' : user.role === 'Editor' ? 'edit_note' : 'visibility'}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{user.role}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    user.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                    user.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <span className={`size-1.5 rounded-full ${
                      user.status === 'Active' ? 'bg-emerald-500' : 
                      user.status === 'Pending' ? 'bg-amber-500' : 
                      'bg-slate-400'
                    }`} />
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm font-medium text-slate-500">{user.dateJoined}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-primary hover:bg-slate-100 p-1.5 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-[11px] md:text-xs text-slate-500 font-medium">
        <span>Showing 4 of 1,240 users</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">Previous</button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default RecentUsersTable;
