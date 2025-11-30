import { useEffect, useRef, useState } from "react";
import config from "../config/api";
import androidBridge from "../utils/androidBridge";

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 24.5,
    humidity: 65,
    moisture: 72,
    ammonia: 15,
  });
  const [lastUpdate, setLastUpdate] = useState(null);

  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = () => {
    try {
      console.log("Connecting to WebSocket:", config.WS_URL);
      const ws = new WebSocket(config.WS_URL);

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        androidBridge.showToast("Connected to server");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received data:", data);

          // Update sensor data
          if (data.type === "sensor_data") {
            setSensorData(data.payload);
            setLastUpdate(new Date());

            // Save to localStorage for offline mode
            localStorage.setItem(
              "lastSensorData",
              JSON.stringify({
                data: data.payload,
                timestamp: Date.now(),
              }),
            );
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        androidBridge.showToast("Connection error");
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < config.WS_MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          console.log(
            `Reconnecting... Attempt ${reconnectAttemptsRef.current}`,
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, config.WS_RECONNECT_DELAY);
        } else {
          console.log("Max reconnection attempts reached");
          androidBridge.showToast("Unable to connect to server");
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("Error creating WebSocket:", error);
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  };

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  // Send actuator commands
  const sendActuatorCommand = (lifecycle, actuator, state) => {
    sendMessage({
      type: "actuator_command",
      payload: {
        lifecycle,
        actuator,
        state,
      },
    });
  };

  useEffect(() => {
    // Load cached data from localStorage
    const cached = localStorage.getItem("lastSensorData");
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        // Use cached data if less than 5 minutes old
        if (age < 5 * 60 * 1000) {
          setSensorData(data);
          setLastUpdate(new Date(timestamp));
        }
      } catch (error) {
        console.error("Error loading cached data:", error);
      }
    }

    // Connect WebSocket
    connect();

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    sensorData,
    lastUpdate,
    sendMessage,
    sendActuatorCommand,
    reconnect: connect,
  };
};
