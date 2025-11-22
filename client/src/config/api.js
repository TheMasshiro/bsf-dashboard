// API Configuration
const config = {
  // WebSocket URL - backend server
  WS_URL: import.meta.env.VITE_WS_URL || "ws://localhost:8080",

  // Reconnection settings
  WS_RECONNECT_DELAY: 3000,
  WS_MAX_RECONNECT_ATTEMPTS: 5,
};

export default config;
