import { useEffect } from "react";

export const useEscapeClosePopup = ([condition, onCloseFunction]) => {
  useEffect(() => {
    const handleKeydown = (evt) => {
      (evt.key === 'Escape') && onCloseFunction();
    };

    if (condition) {
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
  }, [condition, onCloseFunction]);
}
