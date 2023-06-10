import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, select: false, required: true, unique: true },
  password: { type: String, select: false, required: true },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);