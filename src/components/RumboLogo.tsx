import React from 'react';

interface RumboLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'app-icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const RumboLogo: React.FC<RumboLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  showTagline = false
}) => {
  const sizeClasses = {
    sm: variant === 'icon' ? 'w-7 h-7' : 'h-8',
    md: variant === 'icon' ? 'w-10 h-10' : 'h-10 sm:h-11',
    lg: variant === 'icon' ? 'w-14 h-14' : 'h-14 sm:h-16',
    xl: variant === 'icon' ? 'w-20 h-20' : 'h-20 sm:h-24'
  };

  const imageSrc =
    variant === 'icon'
      ? '/rumbo-icon.png'
      : variant === 'app-icon'
      ? '/rumbo-app-icon.png'
      : '/rumbo-logo.png';

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <img
        src={imageSrc}
        alt="RUMBO"
        className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
      />
      {showTagline && (
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00C2FF] mt-0.5">
          Tu camino · Tu vocación · Tu futuro
        </span>
      )}
    </div>
  );
};
