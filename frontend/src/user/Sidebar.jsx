import React from 'react';

const Sidebar = ({ isOpen, onClose, items, supportItems }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 w-72 flex flex-col border-r border-[#e5e7eb] dark:border-[#2a3642] 
        bg-surface-light dark:bg-surface-dark z-40 transition-transform duration-300 lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-[#f0f2f4] dark:border-[#2a3642]">
          <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10 mr-3">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>grid_view</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-[#111418] dark:text-white">UserManage</h2>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <div className="mb-2 px-2 text-xs font-semibold text-[#617589] dark:text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          {items.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                item.isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] hover:text-[#111418] dark:hover:text-white'
              }`}
            >
              <span 
                className={`material-symbols-outlined ${item.fillIcon ? 'filled' : ''}`}
                style={item.fillIcon ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}

          <div className="mt-8 mb-2 px-2 text-xs font-semibold text-[#617589] dark:text-slate-400 uppercase tracking-wider">
            Support
          </div>
          {supportItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#617589] dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] hover:text-[#111418] dark:hover:text-white transition-colors group"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-[#f0f2f4] dark:border-[#2a3642]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f0f2f4] dark:hover:bg-[#25303d] transition-colors cursor-pointer group">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#e5e7eb] dark:border-[#334155]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFxNQ4Q5CPxvapA2znZDp_X7VTvb8wdmq-uUTYdGr66rh-nDAae2jyQv16sLN1lITNaBY2WbH7CmIexGL94O-xoboz60hcmvQUGUDNgLfpEVaFujYCAtdINGSPYdy2peA5SPQ-UcEfjjahxJ2ijerECsNSCqhTHeao-VTJ47QP0UgdZ8Dq_ZV-IUOLiIWL4Pelp0tXyvdcAtu9nXZNt6kBfZGLJ0wiN6Rd5ise7co7W5O2boRa6_SrHDaNjv5M5rqrrqCccIEIzt7a")' }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-[#111418] dark:text-white text-sm font-medium truncate">Alex Johnson</p>
              <p className="text-[#617589] dark:text-slate-400 text-xs truncate">alex.j@example.com</p>
            </div>
            <span className="material-symbols-outlined text-[#617589] dark:text-slate-400 group-hover:text-primary transition-colors" style={{ fontSize: '20px' }}>logout</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
