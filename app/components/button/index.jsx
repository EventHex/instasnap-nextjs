import React from 'react';

const Button = ({
  type = "button",
  disabled = false,
  onClick,
  children,
  className = "",
  width = "w-[80%]"
}) => {
  const baseStyles = "py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const enabledStyles = "bg-blue-600 text-white hover:bg-blue-700";
  const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${width} ${disabled ? disabledStyles : enabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;