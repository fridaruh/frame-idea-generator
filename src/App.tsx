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
  const [sdkReady, setSdkReady] = useState(false);

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

  // Initialize Farcaster SDK properly
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Import the SDK
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        // Check if we're actually in a Mini App context
        const isInMiniApp = await sdk.isInMiniApp();
        
        if (isInMiniApp) {
          console.log('Running in Farcaster Mini App context');
          
          // CRITICAL: Call ready() to hide the loading screen
          await sdk.actions.ready();
          
          // Set up event listeners
          (sdk as any).events?.on('ready', () => {
            console.log('Farcaster Mini App SDK ready');
          });
          
          (sdk as any).events?.on('error', (error: any) => {
            console.error('Farcaster SDK error:', error);
          });
        } else {
          console.log('Running in regular web context');
        }
        
        setSdkReady(true);
      } catch (error) {
        console.warn('Farcaster SDK initialization failed:', error);
        setSdkReady(true); // Continue anyway
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

  // Show loading state while SDK initializes
  if (!sdkReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003049] via-[#f77f00] to-[#d62828] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Cargando Frame Idea Generator...</p>
        </div>
      </div>
    );
  }

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