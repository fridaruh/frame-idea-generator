import { useEffect } from 'react';

export const useOrientationRefresh = () => {
  useEffect(() => {
    const handleOrientationChange = () => {
      // Small delay to ensure the orientation change is complete
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };

    // Listen for orientation change events
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Also listen for resize events as a fallback
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Check if the aspect ratio changed significantly (orientation change)
        const aspectRatio = window.innerWidth / window.innerHeight;
        const previousAspectRatio = parseFloat(sessionStorage.getItem('aspectRatio') || '0');
        
        if (previousAspectRatio > 0) {
          const ratioChange = Math.abs(aspectRatio - previousAspectRatio) / previousAspectRatio;
          // If aspect ratio changed by more than 30%, likely an orientation change
          if (ratioChange > 0.3) {
            window.location.reload();
          }
        }
        
        sessionStorage.setItem('aspectRatio', aspectRatio.toString());
      }, 300);
    };

    // Store initial aspect ratio
    const initialAspectRatio = window.innerWidth / window.innerHeight;
    sessionStorage.setItem('aspectRatio', initialAspectRatio.toString());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
};