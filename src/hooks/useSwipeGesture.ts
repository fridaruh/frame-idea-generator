import { useEffect, useState } from 'react';

export const useDoubleTap = (onDoubleTap: () => void) => {
  const [lastTap, setLastTap] = useState<number>(0);

  useEffect(() => {
    const handleTouchEnd = (event: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      // Double tap detected (within 300ms)
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault();
        onDoubleTap();
        setLastTap(0); // Reset to prevent triple tap
      } else {
        setLastTap(currentTime);
      }
    };

    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lastTap, onDoubleTap]);
};