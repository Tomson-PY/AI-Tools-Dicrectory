import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { getFavicon } from '../utils/favicon';

interface FaviconImageProps {
  url: string;
  name: string;
  size?: 'sm' | 'lg';
}

export const FaviconImage = ({ url, name, size = 'sm' }: FaviconImageProps) => {
  const [imageError, setImageError] = useState(false);
  const faviconUrl = getFavicon(url);

  const containerClasses = size === 'lg' 
    ? "w-32 h-32 rounded-xl bg-white shadow-lg p-4"
    : "w-12 h-12 rounded-lg bg-gray-100";

  const imageClasses = size === 'lg'
    ? "w-20 h-20"
    : "w-8 h-8";

  const placeholderClasses = size === 'lg'
    ? "w-20 h-20 bg-gray-100 rounded-lg"
    : "w-8 h-8 bg-gray-200 rounded";

  if (imageError) {
    return (
      <div className={`${containerClasses} flex items-center justify-center`}>
        <div className={placeholderClasses}>
          <Image className="w-full h-full p-2 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} flex items-center justify-center overflow-hidden`}>
      <img
        src={faviconUrl}
        alt={`${name} logo`}
        className={`${imageClasses} object-contain`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};