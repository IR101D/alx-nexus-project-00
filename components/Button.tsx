import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonProps } from '@/interfaces';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-[#B88E2F] text-black hover:bg-[#A67C2A] transition-colors duration-200',
    secondary: 'bg-[#B88E2F] text-black hover:bg-[#A67C2A]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;