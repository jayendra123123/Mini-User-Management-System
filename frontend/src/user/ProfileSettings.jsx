import React, { useState } from 'react';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';
import Sidebar from './Sidebar';
import ProfileCard from './ProfileCard';
import PersonalInfoForm from './PersonalInfoForm';
import SecurityForm from './SecurityForm';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('public-profile');

  const handleSave = () => {
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 flex justify-center py-5 px-4 md:px-10">
        <div className="w-full max-w-[960px] flex flex-col">
          <Breadcrumbs />
          
          <div className="flex flex-wrap justify-between gap-3 px-4 pb-6 mt-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">
                Profile Settings
              </h1>
              <p className="text-[#637588] text-base font-normal leading-normal">
                Manage your profile information and account security settings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
            {/* Left Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <ProfileCard 
                name="John Doe" 
                role="Administrator" 
                status="Active Account"
                imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBnCsu6OsS12EXyLqUndJQx7Zs1Wo7KKcCczFCtTF_y1zTURjq1OezmzNABIRDXyN_w-JcuckeqBlkJ5WndXfB9I3FpGAhkYsCqnzlY2q0Xf_A3inZN7mLdpsEDkqOOl6wsf-Vj_FfgEY4g_jt_aMTvWzcyA9oKLACosgdoulZDG9dkADzenlS9Q3XY2etfEyEb5WMgR8NvmzUyiLkAx-fy1J_dFIC3sHdyt6NigCcdP0_vp9Ue7QbFjEkiRarjmKrDoTmRdDPG-egF"
              />
              <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <PersonalInfoForm />
              <SecurityForm />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
                <button 
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 h-11 rounded-lg border border-[#d1d5db] text-[#111418] font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 h-11 rounded-lg bg-primary text-white font-bold text-sm shadow-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
