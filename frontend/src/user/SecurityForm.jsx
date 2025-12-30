import React, { useState } from 'react';

const SecurityForm = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPasswords(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
      <div className="border-b border-[#e5e7eb] px-6 py-4">
        <h2 className="text-[#111418] text-lg font-bold">Security</h2>
        <p className="text-[#637588] text-sm mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] text-sm font-medium" htmlFor="current">Current Password</label>
          <input 
            className="h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            id="current"
            type="password"
            value={passwords.current}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#111418] text-sm font-medium" htmlFor="new">New Password</label>
            <input 
              className="h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              id="new"
              type="password"
              value={passwords.new}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[#111418] text-sm font-medium" htmlFor="confirm">Confirm New Password</label>
            <input 
              className="h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              id="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-4 bg-[#137fec]/5 rounded-lg border border-[#137fec]/10">
          <span className="material-symbols-outlined text-primary mt-0.5">info</span>
          <div className="text-sm text-[#637588]">
            <p className="font-semibold text-[#111418] mb-1">Password Requirements</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Minimum 8 characters long - the more, the better</li>
              <li>At least one lowercase character</li>
              <li>At least one number, symbol, or whitespace character</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;
