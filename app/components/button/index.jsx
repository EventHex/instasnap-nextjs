'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

const Button = ({
  variant = 'default',
  type = "button",
  disabled = false,
  onClick,
  children,
  className = "",
  width = "w-full",
  icon,
  iconPosition = "left",
  isBack = false
}) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  // Styles for different variants
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    back: "p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900",
    ghost: "text-gray-600 hover:bg-gray-100"
  }

  // If it's a back button
  if (isBack) {
    return (
      <button 
        onClick={handleBack}
        className={`p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 ${className}`}
        aria-label="Go back"
      >
        {variant === 'chevron' ? (
          <ChevronLeft size={20} strokeWidth={1.5} />
        ) : (
          <ArrowLeft size={24} />
        )}
      </button>
    )
  }

  // For regular buttons
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${width}
        ${variants[variant]}
        py-3 
        px-4 
        rounded-lg 
        font-medium 
        flex 
        items-center 
        justify-center 
        transition-colors 
        duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2">
          {typeof icon === 'string' ? (
            <Image 
              src={icon} 
              alt="button icon" 
              width={20} 
              height={20} 
              className="object-contain"
            />
          ) : (
            icon
          )}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2">
          {typeof icon === 'string' ? (
            <Image 
              src={icon} 
              alt="button icon" 
              width={20} 
              height={20} 
              className="object-contain"
            />
          ) : (
            icon
          )}
        </span>
      )}
    </button>
  )
}

export default Button