// src/App.tsx - Versión optimizada usando isInMiniApp()

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
  const [isInMiniApp, setIsInMiniApp] = useState(false);

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

  // Initialize Farcaster SDK with isInMiniApp()
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const initializeFarcaster = async () => {
      try {
        // Set a timeout to prevent hanging
        timeoutId = setTimeout(() => {
          console.log('SDK initialization timeout - continuing without Farcaster context');
          setSdkReady(true);
          setIsInMiniApp(false);
        }, 3000);

        // Dynamically import the SDK
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        // Check if we're in a mini app using the official method
        const inMiniApp = sdk.context.isInMiniApp();
        setIsInMiniApp(inMiniApp);
        
        if (inMiniApp) {
          console.log('Running inside Farcaster Mini App');
          
          // Initialize the SDK
          const initPromise = sdk.actions.ready();
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('SDK timeout')), 2000)
          );
          
          await Promise.race([initPromise, timeoutPromise]);
          
          // Get additional context if needed
          const context = sdk.context.client;
          console.log('Farcaster context:', context);
          
          clearTimeout(timeoutId);
          console.log('Farcaster Mini App SDK initialized successfully');
        } else {
          console.log('Running outside Mini App context (development/web)');
          clearTimeout(timeoutId);
        }
        
        setSdkReady(true);
        
      } catch (error) {
        console.warn('Farcaster SDK initialization failed:', error);
        clearTimeout(timeoutId);
        setIsInMiniApp(false);
        setSdkReady(true); // Continue anyway
      }
    };

    initializeFarcaster();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
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

      // Track analytics if in mini app
      if (isInMiniApp) {
        try {
          const { sdk } = await import('@farcaster/miniapp-sdk');
          // You could send analytics here if the SDK supports it
          console.log('Ideas generated in Mini App context');
        } catch (error) {
          console.warn('Analytics tracking failed:', error);
        }
      }

    } catch (error) {
      console.error('Error generating ideas:', error);
      setAppState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [currentSelection, isInMiniApp]);

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
          <p className="text-lg font-medium">
            {isInMiniApp ? 'Iniciando Mini App...' : 'Cargando Frame Idea Generator...'}
          </p>
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
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          Mini App: {isInMiniApp ? 'Yes' : 'No'}
        </div>
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <ElementBlock
          type="artefacto"
          value={currentSelection.artefacto}
          isLocked={lockStates.artefacto}
          onToggleLock={() => toggleLock('artefacto')}
          className="bg-[#003049]"
        />

        <ElementBlock
          type="tema"
          value={currentSelection.tema}
          isLocked={lockStates.tema}
          onToggleLock={() => toggleLock('tema')}
          className="bg-[#f77f00]"
        />

        <ElementBlock
          type="industria"
          value={currentSelection.industria}
          isLocked={lockStates.industria}
          onToggleLock={() => toggleLock('industria')}
          className="bg-[#d62828]"
        />
      </div>

      <PromptDisplay 
        selection={currentSelection} 
        onGenerateIdeas={handleGenerateIdeas}
        isGenerating={appState.isLoading}
      />

      <div className="sr-only" aria-live="polite">
        Prompt actual: Hay un {currentSelection.artefacto} en el contexto de {currentSelection.tema} que impacta en {currentSelection.industria}
      </div>
    </div>
  );
}

export default App;