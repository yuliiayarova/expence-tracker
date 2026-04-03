import React from 'react';

interface IconProps {
  name: string;      // ID іконки зі спрайту (наприклад, 'icon-eye')
  size?: number;     // Розмір (ширина і висота будуть однаковими)
  className?: string; // Для додаткових стилів Tailwind
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      className={`inline-block fill-current ${className}`}
      aria-hidden="true"
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;