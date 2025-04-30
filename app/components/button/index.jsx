import React from 'react';
import Image from 'next/image';

// Define variants and their corresponding styles
const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50", // Default text color for outline
  ghost: "hover:bg-gray-100 text-blue-600", // Example for ghost variant
  // Add other variants as needed
};

const Button = ({
  type = "button",
  variant = "default", // Add variant prop with default
  disabled = false,
  onClick,
  children,
  className = "",
  width = "w-auto", // Changed default width to auto for flexibility
  icon = null,
  buttonName, // Consider removing if children is always used
  alt = "", // No longer needed if not using next/image for icons
  iconPosition = "left" // Can be "left" or "right"
}) => {
  // Adjusted baseStyles for better alignment with icons
  const baseStyles = "inline-flex items-center justify-center py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium transition-colors duration-150"; 
  
  // Specific styles for disabled state
  const disabledStyles = "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200";
  
  // Determine styles based on variant and disabled state
  const variantStyles = variants[variant] || variants.default;
  const appliedStyles = disabled ? disabledStyles : variantStyles;

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      // Construct className: base + width + (disabled styles OR variant styles) + custom className
      // Custom className comes last to allow overrides
      className={`${baseStyles} ${width} ${appliedStyles} ${className}`.trim()} // Use trim() to remove extra spaces
    >
      {/* Directly render the icon component if it exists */}
      {icon && iconPosition === "left" && (
        <span className="mr-2 -ml-1 h-5 w-5">
          <Image src={icon} alt={alt} width={20} height={20} />
        </span>
      )}
      {children} {/* Removed buttonName fallback, rely on children */}
      {icon && iconPosition === "right" && (
        <span className="ml-2 -mr-1 h-5 w-5">
          <Image src={icon} alt={alt} width={20} height={20} />
        </span>
      )}
      {buttonName}
    </button>
  );
};

export default Button;