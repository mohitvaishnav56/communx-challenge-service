// import from modules
import express from "express";
import cookieParser from "cookie-parser";
import challengeRoutes from "./routes/challenge.routes";

// types import
import type { Application } from "express";

// declarations
const app: Application = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/challenges", challengeRoutes);

export default app;