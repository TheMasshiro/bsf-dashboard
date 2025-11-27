import { useEffect } from "react";

// Hook to handle app lifecycle events (background/foreground)
export const useLifecycleEvents = (callbacks) => {
  const { onPause, onResume } = callbacks;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App went to background
        console.log("App paused - going to background");
        if (onPause) onPause();
      } else {
        // App came to foreground
        console.log("App resumed - coming to foreground");
        if (onResume) onResume();
      }
    };

    const handleBeforeUnload = () => {
      console.log("App closing");
      if (onPause) onPause();
    };

    // Listen for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Listen for page unload (app closing)
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onPause, onResume]);
};
