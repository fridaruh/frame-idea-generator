import React from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { MiniAppIdea } from '../types';

interface IdeasViewProps {
  prompt: string;
  ideas: MiniAppIdea[];
  isLoading: boolean;
  onBack: () => void;
}

export const IdeasView: React.FC<IdeasViewProps> = ({
  prompt,
  ideas,
  isLoading,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#d62828] hover:text-[#b91c1c] transition-colors duration-200 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Volver al generador</span>
        </button>
        
        {/* Prompt display */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 mb-2">Prompt utilizado:</h2>
          <p className="text-gray-900 leading-relaxed">{prompt}</p>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="text-[#f77f00]" size={28} />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Lista de ideas de mini-apps que puedes crear:
          </h1>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 pb-8">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-[#003049]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003049] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idea.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 leading-relaxed text-base sm:text-lg">
                      {idea.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && ideas.length === 0 && (
          <div className="text-center py-12 pb-8">
            <div className="text-gray-400 mb-4">
              <Lightbulb size={48} />
            </div>
            <p className="text-gray-600 text-lg">
              No se pudieron generar ideas. Intenta nuevamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};