import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to database");
    app.listen(env.PORT, () => {
      console.log("Server running!");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });
