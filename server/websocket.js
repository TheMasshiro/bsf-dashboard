import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    ws.send(
      JSON.stringify({
        type: "sensor_data",
        payload: {
          temperature: Math.ceil(20 + Math.random() * 15),
          humidity: Math.ceil(50 + Math.random() * 30),
          moisture: Math.ceil(60 + Math.random() * 30),
          light: Math.ceil(500 + Math.random() * 500),
        },
      }),
    );
  }, 3000);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received:", data);

    if (data.type === "actuator_command") {
      const { lifecycle, actuator, state } = data.payload;
      console.log(`Actuator: ${actuator} in ${lifecycle} set to
   ${state}`);
    }
  });

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});
