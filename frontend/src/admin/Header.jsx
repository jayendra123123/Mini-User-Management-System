
import React from 'react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-8 py-4">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-xl font-bold text-slate-900">Overview</h2>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search */}
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input 
            className="w-48 md:w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
            placeholder="Search users, roles..." 
            type="text" 
          />
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-full transition-all">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          
          <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
