import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-500 hover:bg-red-600',
    success: 'bg-green-500 hover:bg-green-600',
    info: 'bg-blue-500 hover:bg-blue-600'
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1a232d] rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-full ${colors[type]} flex items-center justify-center`}>
            <span className="material-symbols-outlined text-white text-[24px]">
              {type === 'danger' ? 'warning' : type === 'success' ? 'check_circle' : 'info'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg ${colors[type]} text-white font-semibold transition-all shadow-lg`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
