
import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'User Management', icon: 'group', active: false },
    { label: 'Roles & Permissions', icon: 'verified_user', active: false },
    { label: 'Settings', icon: 'settings', active: false },
  ];

  const bottomItems = [
    { label: 'Help & Support', icon: 'help' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-4 transition-transform duration-300 lg:translate-x-0 lg:static lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            {/* Logo area */}
            <div className="flex items-center gap-3 px-2">
              <div className="flex items-center justify-center rounded-lg bg-primary size-10 text-white">
                <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
              </div>
              <h1 className="text-slate-900 text-lg font-bold leading-normal">Mini Admin</h1>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className={`material-symbols-outlined ${item.active ? 'material-symbols-fill' : ''}`}>
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium leading-normal">{item.label}</p>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2">
            {bottomItems.map((item) => (
              <a 
                key={item.label}
                href="#" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p className="text-sm font-medium leading-normal">{item.label}</p>
              </a>
            ))}
            
            <div className="h-px bg-slate-200 my-1"></div>
            
            <div className="flex items-center gap-3 px-3 py-4">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-slate-200 shadow-inner"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkIXNjdGDsr4L4St7U66Z79SiW3f1fqep6OqZIzLdlBXxg14UoV3MFRhZ2vIjXiaBuew90nBf4EB2VZdZNj6ujtDWeTny51RykhBGmMEnBOrZ7xrhtzu1_YdkYht-b6Y7sVljWH6xBwwkhAW9X4l1jALTQvesw1QTnR5DKAjVoInVybFS6RWx7_A6xnx-ZIELwJxU950Z4kItUKkR3y_XvB1ohJ5bCS-PbbrBchNVhPjJaT9nrVQigKXEDrUscIx1J3ZHZWVJH0E3A")` }}
              />
              <div className="flex flex-col min-w-0">
                <p className="text-slate-900 text-sm font-bold leading-none truncate">Alex Morgan</p>
                <p className="text-slate-500 text-xs font-normal mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
