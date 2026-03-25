"use client";

import { useEffect } from 'react';

export default function ClientGuard() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // // Prevent F12
      // if (e.key === 'F12') {
      //   e.preventDefault();
      // }
      
      // // Prevent Ctrl+Shift+I (DevTools)
      // if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      //   e.preventDefault();
      // }
      
      // Prevent Ctrl+Shift+J (DevTools Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }

      // Prevent Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
      
      // Prevent Ctrl+C (Copy) - Optional, may be too restrictive
      // if (e.ctrlKey && e.key === 'c') {
      //   e.preventDefault();
      // }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
