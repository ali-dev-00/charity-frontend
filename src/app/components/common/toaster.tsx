
import { useState, useEffect } from 'react';
import { CircleX } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';  
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyles = {
    success: 'bg-green-500/70 border-green-500',
    error: 'bg-red-500/70 border-red-500',
  };

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 ${toastStyles[type]} border text-white text-md font-semibold rounded-lg flex items-center space-x-3 shadow-md`}
      style={{ zIndex: 9999 }}
    >
      <span>{message}</span>
    
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold text-xl focus:outline-none hover:opacity-90 cursor-pointer rounded-full p-1"
      >
        <CircleX />
      </button>
    </div>
  );
};

export default Toast;
