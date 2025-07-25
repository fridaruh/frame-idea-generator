import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { CurrentSelection } from '../types';

interface PromptDisplayProps {
  selection: CurrentSelection;
  onGenerateIdeas: () => void;
  isGenerating: boolean;
}

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ 
  selection, 
  onGenerateIdeas, 
  isGenerating 
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 relative flex-shrink-0 min-h-[20vh] flex items-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed text-gray-900 pr-16">
          Hay un{' '}
          <span className="font-bold text-[#003049]">
            [{selection.artefacto.toLowerCase()}]
          </span>{' '}
          en el contexto de{' '}
          <span className="font-bold text-[#f77f00]">
            [{selection.tema.toLowerCase()}]
          </span>{' '}
          que impacta en{' '}
          <span className="font-bold text-[#d62828]">
            [{selection.industria.toLowerCase()}]
          </span>
        </p>
      </div>
      
      <button
        onClick={onGenerateIdeas}
        disabled={isGenerating}
        className="absolute top-1/2 right-4 sm:right-6 md:right-8 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
        aria-label={isGenerating ? "Generando ideas..." : "Generar ideas de mini-apps"}
      >
        {isGenerating ? (
          <Loader2 className="text-white animate-spin" size={18} />
        ) : (
          <Check className="text-white" size={18} />
        )}
      </button>
    </div>
  );
};