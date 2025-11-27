import express from "express";
import getHourlyAnalytics from "../controllers/AnalyticsController.js";

const analyticsRouter = express.Router();

// Get today's hourly data
analyticsRouter.get("/today", getHourlyAnalytics);

export default analyticsRouter;
