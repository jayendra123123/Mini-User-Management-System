import React from 'react';

const ProfileCard = ({ name, role, status, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative group cursor-pointer">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 mb-4 ring-4 ring-[#f6f7f8]" 
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
          <div className="absolute bottom-4 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors">
            <span className="material-symbols-outlined text-sm">edit</span>
          </div>
        </div>
        <h3 className="text-[#111418] text-xl font-bold leading-tight">{name}</h3>
        <p className="text-[#637588] text-sm mb-4">{role}</p>
        <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="size-1.5 inline-block rounded-full bg-green-800"></span>
          {status}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
