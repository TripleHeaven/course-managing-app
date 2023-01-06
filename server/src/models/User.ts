import { Schema, model } from "mongoose";

// User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// User model
export const User = model("User", UserSchema);
