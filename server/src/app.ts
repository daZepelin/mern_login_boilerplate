import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./models/note";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

app.use(
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    const message = "Something went wrong";
    res.status(500).json({ error: message });
  }
);

export default app;
