import React from 'react';
import { Lightbulb, Zap } from 'lucide-react';

interface InitialPopupProps {
  onStart: () => void;
}

export const InitialPopup: React.FC<InitialPopupProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 text-center my-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#003049] via-[#f77f00] to-[#d62828] rounded-full flex items-center justify-center">
            <Zap className="text-white" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-900">
          Frame Idea Generator
        </h1>
        
        <p className="text-sm text-gray-600 mb-6">
          Mini-app para generar ideas creativas de Farcaster Frames
        </p>

        <div className="text-left mb-6 sm:mb-8 space-y-3 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Haz doble toque en la pantalla</span> o <span className="font-semibold">presiona la barra espaciadora</span> para generar nuevas combinaciones.
          </p>
          <p>
            <span className="font-semibold">Haz clic en los candados</span> para fijar elementos que te gusten.
          </p>
          <p>
            Cuando tengas una combinación interesante, <span className="font-semibold">presiona "Generar Ideas"</span> para obtener 3 conceptos de mini-apps usando IA.
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-[#003049] to-[#d62828] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
        >
          <Lightbulb size={20} />
          Empezar a generar ideas
        </button>
      </div>
    </div>
  );
};