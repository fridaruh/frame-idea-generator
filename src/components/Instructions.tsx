import React, { useState } from 'react';
import { HelpCircle, X, Smartphone, Monitor, Lightbulb } from 'lucide-react';

export const Instructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 bg-black bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all duration-200"
        aria-label="Ver instrucciones"
      >
        <HelpCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Cerrar instrucciones"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={24} />
              Frame Idea Generator
            </h2>
            
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone size={16} />
                  Móvil
                </h3>
                <p>Haz doble toque en la pantalla para generar nuevos elementos</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Monitor size={16} />
                  Desktop
                </h3>
                <p>Presiona la barra espaciadora para generar nuevos elementos</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Bloquear elementos</h3>
                <p>Haz clic en el candado para mantener fijo un elemento específico</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Generar ideas</h3>
                <p>Presiona "Generar Ideas" para obtener 3 conceptos de mini-apps usando IA</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Genera ideas creativas para mini-apps de Farcaster combinando artefactos, temas e industrias
            </p>
          </div>
        </div>
      )}
    </>
  );
};