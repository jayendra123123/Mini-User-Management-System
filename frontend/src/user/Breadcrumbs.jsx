import React from 'react';

const Breadcrumbs = () => {
  return (
    <nav className="flex flex-wrap gap-2 px-4 py-2">
      <a className="text-[#637588] text-sm font-medium leading-normal hover:underline" href="#">Home</a>
      <span className="text-[#637588] text-sm font-medium leading-normal">/</span>
      <a className="text-[#637588] text-sm font-medium leading-normal hover:underline" href="#">Settings</a>
      <span className="text-[#637588] text-sm font-medium leading-normal">/</span>
      <span className="text-[#111418] text-sm font-medium leading-normal">Profile</span>
    </nav>
  );
};

export default Breadcrumbs;
