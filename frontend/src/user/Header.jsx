
import React from 'react';

const Header = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-[#f0f2f4] dark:border-[#2a3642] bg-surface-light dark:bg-surface-dark shrink-0 z-20">
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={onMenuClick} className="text-[#111418] dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-lg font-bold text-[#111418] dark:text-white">Dashboard</h2>
      </div>

      {/* Search (Desktop) */}
      <div className="hidden lg:flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#617589] dark:text-slate-400" style={{ fontSize: '20px' }}>search</span>
          </div>
          <input 
            className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-[#f0f2f4] dark:bg-[#25303d] text-[#111418] dark:text-white placeholder-[#617589] dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm" 
            placeholder="Search resources, documents, or help..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-colors"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        
        <button className="relative p-2 rounded-full text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
          <span className="absolute top-1.5 right-1.5 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#18232e]"></span>
        </button>

        <div 
          className="lg:hidden bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-[#e5e7eb] dark:border-[#334155]" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDARVfAm_tu7vgJ4gcy1xpXudZHIZcYHERJkpUbQI-SHHj9RLyhjvmE7CtnH-37MkXP8mE3NakoAkFvugB5NRe9j9tB3xwBP8M4KPn3ucn2IRZV8VTVJ3OI-sisbbQ5JVLSh4nloxi2rFNmQAxL1TsmaNvNcEOke9l6AlAhlOjtwBdM5viYMTJpC-jEWHERjQpasQxK7eOsqkiuBiFK16SZEQ_99RMlwM10zYozV1E3iSltO7FMrBtFwS5oCRlvljnJQoEeDhPxE6Mo")' }}
        />
      </div>
    </header>
  );
};

export default Header;
