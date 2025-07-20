"use client"
import React from 'react';

const Button = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  type = "button",
  disabled = false
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
  const primaryClasses = "bg-[#B6F500] text-black hover:bg-[#A5E000] shadow-lg hover:shadow-xl";
  const secondaryClasses = "bg-white text-black border-2 border-[#B6F500] hover:bg-[#B6F500] shadow-lg hover:shadow-xl";
  
  return (
    <button 
      type={type}
      className={`${baseClasses} ${variant === "primary" ? primaryClasses : secondaryClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;