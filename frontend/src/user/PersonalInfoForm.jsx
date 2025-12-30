import React, { useState } from 'react';

const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
      <div className="border-b border-[#e5e7eb] px-6 py-4">
        <h2 className="text-[#111418] text-lg font-bold">Personal Information</h2>
        <p className="text-[#637588] text-sm mt-1">Update your photo and personal details here.</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] text-sm font-medium" htmlFor="firstName">First Name</label>
          <input 
            className="h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] text-sm font-medium" htmlFor="lastName">Last Name</label>
          <input 
            className="h-11 w-full rounded-lg border border-[#d1d5db] bg-white px-3 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
        
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[#111418] text-sm font-medium" htmlFor="email">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#9ca3af]">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </div>
            <input 
              className="h-11 w-full rounded-lg border border-[#d1d5db] bg-gray-50 pl-10 pr-3 text-[#637588] text-sm outline-none cursor-not-allowed"
              id="email"
              type="email"
              value={formData.email}
              disabled
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs text-[#637588] bg-gray-200 px-2 py-0.5 rounded">Verified</span>
            </div>
          </div>
          <p className="text-xs text-[#637588] mt-1">To change your email, please contact support.</p>
        </div>
        
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[#111418] text-sm font-medium" htmlFor="bio">Bio</label>
          <textarea 
            className="w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-[#111418] text-sm placeholder-[#9ca3af] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            id="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio about yourself..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
