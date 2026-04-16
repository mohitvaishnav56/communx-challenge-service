// import from modules
import express from "express";
import cookieParser from "cookie-parser";

// types import
import type { Application } from "express";

// declarations
const app: Application = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

export default app;