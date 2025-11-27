// Local Storage utilities for offline mode

export const storage = {
  // Save data to localStorage
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  // Get data from localStorage
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  },

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  // Clear all data
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  LIFECYCLE: "currentLifecycle",
  ACTUATOR_STATES: "actuatorStates",
  SENSOR_DATA: "lastSensorData",
  NOTIFICATIONS: "notifications",
  SETTINGS: "userSettings",
};
