
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: `
    bg-primary hover:bg-primary-dark text-background-dark 
    shadow-lg shadow-primary/20 font-bold
  `,
    secondary: `
    bg-primary/10 text-primary-dark dark:text-primary 
    hover:bg-primary/20 font-bold
  `,
    outline: `
    bg-white dark:bg-surface-dark border border-[#e8eceb] dark:border-gray-700
    hover:bg-gray-50 dark:hover:bg-white/5 text-text-main dark:text-white font-bold
  `,
    ghost: `
    text-text-sub hover:text-text-main hover:bg-gray-100 dark:hover:bg-white/5
  `,
};

const sizeClasses: Record<ButtonSize, { button: string; icon: string }> = {
    sm: { button: 'h-9 px-3 text-xs rounded-lg gap-1.5', icon: 'text-[16px]' },
    md: { button: 'h-11 px-5 text-sm rounded-xl gap-2', icon: 'text-[18px]' },
    lg: { button: 'h-12 px-6 text-sm rounded-xl gap-2', icon: 'text-[20px]' },
};

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    className = '',
    ...props
}) => {
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];
    const widthClass = fullWidth ? 'w-full' : '';

    const iconElement = icon && (
        <span className={`material-symbols-outlined ${sizeClass.icon}`}>{icon}</span>
    );

    return (
        <button
            className={`
        inline-flex items-center justify-center transition-all
        ${variantClass} ${sizeClass.button} ${widthClass} ${className}
      `}
            {...props}
        >
            {iconPosition === 'left' && iconElement}
            <span>{children}</span>
            {iconPosition === 'right' && iconElement}
        </button>
    );
};

export default Button;
