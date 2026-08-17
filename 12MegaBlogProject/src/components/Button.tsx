import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    rounded = 'rounded',
    className = '',
    ...props
}: {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    bgColor?: string;
    textColor?: string;
    rounded?: string;
    className?: string;
    [key: string]: any;
}) {
  return (
    <button
        type={type}
        className={`inline-block ${bgColor} ${textColor} ${rounded} ${className}`}
        {...props}>
            {children}
        </button>
  )
}

export default Button