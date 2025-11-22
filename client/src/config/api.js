const config = {
  // WebSocket URL - backend server
  WS_URL: import.meta.env.VITE_WS_URL,

  // Reconnection settings
  WS_RECONNECT_DELAY: 3000,
  WS_MAX_RECONNECT_ATTEMPTS: 5,
};

export default config;
