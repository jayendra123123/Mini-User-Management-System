
import React from 'react';

const InputGroup = ({
  label,
  id,
  type,
  icon,
  placeholder,
  value,
  onChange,
  showPasswordToggle,
  onTogglePassword,
  isPasswordVisible,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#111418] dark:text-white text-base font-medium leading-normal" htmlFor={id}>
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
          {icon}
        </span>
        <input
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 pl-11 pr-11 placeholder:text-[#617589] dark:placeholder:text-gray-500 text-base font-normal leading-normal transition-all"
          id={id}
          type={showPasswordToggle ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPasswordVisible ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
