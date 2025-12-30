import React from 'react';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] bg-white px-6 md:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-8 flex items-center justify-center bg-[#137fec]/10 rounded-lg text-primary">
          <span className="material-symbols-outlined">admin_panel_settings</span>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
          User Management System
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-[#637588] hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
          <a className="text-[#637588] hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Users</a>
          <a className="text-primary text-sm font-bold leading-normal transition-colors" href="#">Settings</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[#637588] hover:text-[#111418] p-2 rounded-full hover:bg-gray-100 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white shadow-sm cursor-pointer" 
            title="User Profile"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7Fa3eoK9WTB2Xw8Kn2BJh4Ps6u_3GdDtFspLXJI3rL2xMM7kg27UlIfYEy6spdbPhQQm_HhLcqmzsuOdBhEdOPUGvV0spAMQVKny3H7pA6ILB0kWSUi9eGm6kqkn5o4U19_srvWafYbT24heHO4fCPgsQLER8hwoyKCiY3I37jRtJ0b6QboHp1NC7iuXPTrDgwCMRt8u8VSXkFSoq5_wWOGZjGgv-tgYSHFtb1NFoPoIPRdB7Ievrt589nO3iuVAgYJN-hlwhMEAn")` }}
          />
          
          <a className="text-[#111418] text-sm font-medium leading-normal hidden md:block hover:text-red-500 transition-colors" href="#">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
