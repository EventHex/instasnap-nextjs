import React from 'react';
import Image from 'next/image';

const Dropdown = ({
  value,
  placeholder,
  icon,
  options,
  isOpen,
  onToggle,
  onSelect,
  className = "",
  containerClassName = ""
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <div 
        onClick={onToggle}
        className="relative cursor-pointer"
      >
        <input
          type="text"
          readOnly
          value={value}
          placeholder={placeholder}
          className={`w-full bg-[#F6F8FA] py-3 pl-10 pr-4 text-[#CDD0D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Image 
              src={icon} 
              alt={placeholder || "dropdown icon"} 
              width={20} 
              height={20} 
              className="h-5 w-5"
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E4E9] rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <div 
              key={option.value}
              className="py-2 px-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown; 