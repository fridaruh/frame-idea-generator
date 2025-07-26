import React, { useState, useCallback, useEffect } from 'react';
import { CurrentSelection, LockStates, ElementType, AppState, MiniAppIdea } from './types';
import { getRandomElement } from './data';
import { generateMiniAppIdeas } from './services/openai';
import { useKeyboard } from './hooks/useKeyboard';
import { useDoubleTap } from './hooks/useSwipeGesture';
import { useOrientationRefresh } from './hooks/useOrientationRefresh';
import { ElementBlock } from './components/ElementBlock';
import { PromptDisplay } from './components/PromptDisplay';
import { Instructions } from './components/Instructions';
import { IdeasView } from './components/IdeasView';
import { InitialPopup } from './components/InitialPopup';

function App() {
  const [showInitialPopup, setShowInitialPopup] = useState(true);

  // Initialize with random values
  const [currentSelection, setCurrentSelection] = useState<CurrentSelection>(() => ({
    artefacto: getRandomElement('artefacto'),
    tema: getRandomElement('tema'),
    industria: getRandomElement('industria'),
  }));

  const [lockStates, setLockStates] = useState<LockStates>({
    artefacto: false,
    tema: false,
    industria: false,
  });

  const [appState, setAppState] = useState<AppState>({
    view: 'generator',
    currentPrompt: '',
    ideas: [],
    isLoading: false,
  });

  // Initialize Farcaster SDK only when in Farcaster context
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're in a Farcaster environment (iframe or specific user agent)
        const isInFarcaster = typeof window !== 'undefined' && (
          window.parent !== window || 
          window.location.hostname.includes('farcaster') ||
          navigator.userAgent.includes('Farcaster')
        );
        
        if (isInFarcaster) {
          // Dynamically import and initialize Farcaster SDK
          const { sdk } = await import('@farcaster/miniapp-sdk');
          
          // Initialize the SDK
          await sdk.actions.ready();
          
          // Set up event listeners for SDK events
          sdk.events.on('ready', () => {
            console.log('Farcaster Mini App SDK ready');
          });
          
          sdk.events.on('error', (error) => {
            console.error('Farcaster SDK error:', error);
          });
          
          console.log('Farcaster Mini App SDK initialized successfully');
        } else {
          console.log('Running in development mode - Farcaster SDK not needed');
        }
      } catch (error) {
        console.warn('Farcaster SDK initialization failed:', error);
      }
    };

    initializeFarcaster();
  }, []);

  const handleStartApp = useCallback(() => {
    setShowInitialPopup(false);
  }, []);

  const generateNewElements = useCallback(() => {
    setCurrentSelection(prev => ({
      artefacto: lockStates.artefacto ? prev.artefacto : getRandomElement('artefacto'),
      tema: lockStates.tema ? prev.tema : getRandomElement('tema'),
      industria: lockStates.industria ? prev.industria : getRandomElement('industria'),
    }));
  }, [lockStates]);

  const toggleLock = useCallback((type: ElementType) => {
    setLockStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, []);

  const handleGenerateIdeas = useCallback(async () => {
    const prompt = `Hay un ${currentSelection.artefacto.toLowerCase()} en el contexto de ${currentSelection.tema.toLowerCase()} que impacta en ${currentSelection.industria.toLowerCase()}. ¿Qué es? Imagina que es una mini-app para Farcaster. Dame 3 ideas viables, claras y cortas.`;
    
    setAppState(prev => ({
      ...prev,
      view: 'ideas',
      currentPrompt: prompt,
      isLoading: true,
      ideas: [],
    }));

    try {
      const generatedIdeas = await generateMiniAppIdeas(
        currentSelection.artefacto,
        currentSelection.tema,
        currentSelection.industria
      );

      const ideas: MiniAppIdea[] = generatedIdeas.map((text, index) => ({
        id: index + 1,
        text,
      }));

      setAppState(prev => ({
        ...prev,
        ideas,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error generating ideas:', error);
      setAppState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [currentSelection]);

  const handleBackToGenerator = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      view: 'generator',
    }));
  }, []);

  // Custom hooks for interactions
  useKeyboard(appState.view === 'generator' && !showInitialPopup ? generateNewElements : () => {});
  useDoubleTap(appState.view === 'generator' && !showInitialPopup ? generateNewElements : () => {});
  useOrientationRefresh();

  // Show initial popup
  if (showInitialPopup) {
    return <InitialPopup onStart={handleStartApp} />;
  }

  if (appState.view === 'ideas') {
    return (
      <IdeasView
        prompt={appState.currentPrompt}
        ideas={appState.ideas}
        isLoading={appState.isLoading}
        onBack={handleBackToGenerator}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Instructions />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Artefacto - Prussian Blue */}
        <ElementBlock
          type="artefacto"
          value={currentSelection.artefacto}
          isLocked={lockStates.artefacto}
          onToggleLock={() => toggleLock('artefacto')}
          className="bg-[#003049]"
        />

        {/* Tema - Orange Wheel */}
        <ElementBlock
          type="tema"
          value={currentSelection.tema}
          isLocked={lockStates.tema}
          onToggleLock={() => toggleLock('tema')}
          className="bg-[#f77f00]"
        />

        {/* Industria - Fire Engine Red */}
        <ElementBlock
          type="industria"
          value={currentSelection.industria}
          isLocked={lockStates.industria}
          onToggleLock={() => toggleLock('industria')}
          className="bg-[#d62828]"
        />
      </div>

      {/* Prompt display */}
      <PromptDisplay 
        selection={currentSelection} 
        onGenerateIdeas={handleGenerateIdeas}
        isGenerating={appState.isLoading}
      />

      {/* Hidden instruction for screen readers */}
      <div className="sr-only" aria-live="polite">
        Prompt actual: Hay un {currentSelection.artefacto} en el contexto de {currentSelection.tema} que impacta en {currentSelection.industria}
      </div>
    </div>
  );
}

export default App;

