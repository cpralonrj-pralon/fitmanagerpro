
import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
    src?: string | null;
    name: string;
    size?: AvatarSize;
    className?: string;
    showBorder?: boolean;
}

const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
    'xs': { container: 'size-5', text: 'text-[8px]' },
    'sm': { container: 'size-8', text: 'text-[10px]' },
    'md': { container: 'size-10', text: 'text-xs' },
    'lg': { container: 'size-16', text: 'text-sm' },
    'xl': { container: 'size-32', text: 'text-2xl' },
};

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
    src,
    name,
    size = 'md',
    className = '',
    showBorder = false
}) => {
    const sizeClass = sizeClasses[size];
    const borderClass = showBorder ? 'border-2 border-white dark:border-gray-800' : '';

    if (src) {
        return (
            <div
                className={`
          ${sizeClass.container} rounded-full bg-cover bg-center shrink-0
          ${borderClass} ${className}
        `}
                style={{ backgroundImage: `url(${src})` }}
                aria-label={name}
            />
        );
    }

    return (
        <div
            className={`
        ${sizeClass.container} ${sizeClass.text} rounded-full shrink-0
        bg-primary/20 text-primary-dark dark:text-primary
        flex items-center justify-center font-bold
        ${borderClass} ${className}
      `}
            aria-label={name}
        >
            {getInitials(name)}
        </div>
    );
};

export default Avatar;
