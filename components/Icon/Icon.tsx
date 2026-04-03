import React from 'react';

interface IconProps {
  name: string;      // ID іконки зі спрайту (наприклад, 'icon-eye')
  size?: number;     // Розмір (ширина і висота будуть однаковими)
  className?: string; // Для додаткових стилів Tailwind
}

export default function Icon({ name, size = 24, className = "" }: IconProps) {
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

