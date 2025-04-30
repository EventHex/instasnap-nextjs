import React from 'react';
import Image from 'next/image';

const Button = ({
  type = "button",
  disabled = false,
  onClick,
  children,
  className = "",
  width = "w-[80%]",
  icon = null,
  buttonName,
  alt,
  iconPosition = "left", // Can be "left" or "right"
  variant = "default" // Add variant support: "default" or "outline"
}) => {
  const baseStyles = "py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  
  // Style based on variant
  let variantStyles = "";
  if (variant === "outline") {
    variantStyles = "bg-white text-black border-2 border-gray-200 hover:bg-gray-100";
  } else {
    // Default variant
    variantStyles = disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700";
  }
  
  const iconStyles = "flex justify-center items-center transition-all duration-300";
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${width} ${variantStyles} ${iconStyles} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <div className="mr-2 relative h-5 w-5">
          <Image
            src={icon}
            alt={alt || "button icon"}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
      {children || buttonName}
      {icon && iconPosition === "right" && (
        <div className="ml-2 relative h-5 w-5">
          <Image
            src={icon}
            alt={alt || "button icon"}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
    </button>
  );
};

export default Button;