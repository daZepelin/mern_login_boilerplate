import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createHttpError, { isHttpError } from "http-errors";

import userRoutes from "./routes/users";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/users', userRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let message = "Something went wrong";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    message = error.message;
  }
  res.status(statusCode).json({ error: message });
});

export default app;
