import connectDB from "./configs/mongodb.js";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
await connectDB();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (_req, res) => res.send("API Working"));
