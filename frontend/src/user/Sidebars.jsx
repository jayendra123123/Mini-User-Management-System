import React from 'react';

const Sidebars = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'public-profile', label: 'Public Profile', icon: 'person' },
    { id: 'security', label: 'Security & Password', icon: 'lock' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'delete', label: 'Delete Account', icon: 'delete' },
  ];

  return (
    <div className="hidden lg:flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden shadow-sm">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex items-center gap-3 px-5 py-4 transition-all text-left ${
            activeTab === item.id 
              ? 'bg-[#137fec]/5 border-l-4 border-primary text-primary font-medium' 
              : 'hover:bg-gray-50 text-[#637588]'
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebars;
