import React from 'react';
import Image from 'next/image';

const Input = ({ 
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  icon,
  readOnly = false,
  onClick,
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        onClick={onClick}
        className={`w-full bg-[#F6F8FA] py-3 pl-10 pr-4 text-[#CDD0D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Image 
            src={icon} 
            alt={placeholder || "input icon"} 
            width={20} 
            height={20} 
            className="h-5 w-5"
          />
        </div>
      )}
    </div>
  );
};

export default Input;