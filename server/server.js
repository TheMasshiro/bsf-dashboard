import connectDB from "./configs/mongodb.js";
import express from "express";
import cors from "cors";
import "dotenv/config";

import analyticsRouter from "./routes/AnalyticsRoute.js";

const app = express();
await connectDB();
app.use(cors());

app.use("/api/analytics", express.json(), analyticsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (_req, res) => res.send("API Working"));
