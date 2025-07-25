import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { ElementType } from '../types';

interface ElementBlockProps {
  type: ElementType;
  value: string;
  isLocked: boolean;
  onToggleLock: () => void;
  className: string;
}

export const ElementBlock: React.FC<ElementBlockProps> = ({
  type,
  value,
  isLocked,
  onToggleLock,
  className
}) => {
  const getTitle = () => {
    switch (type) {
      case 'artefacto': return 'Artefacto';
      case 'tema': return 'Tema';
      case 'industria': return 'Industria';
      default: return '';
    }
  };

  return (
    <div className={`relative flex-1 flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 min-h-[33vh] lg:min-h-0 ${className}`}>
      <button
        onClick={onToggleLock}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 text-white opacity-60 hover:opacity-100 transition-opacity duration-200"
        aria-label={`${isLocked ? 'Desbloquear' : 'Bloquear'} ${getTitle().toLowerCase()}`}
      >
        {isLocked ? <Lock size={24} /> : <Unlock size={24} />}
      </button>
      
      <div className="text-center">
        <h2 className="text-base sm:text-lg lg:text-xl font-medium mb-2 text-white opacity-80">
          [{getTitle()}]
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight px-2">
          {value}
        </p>
      </div>
    </div>
  );
};