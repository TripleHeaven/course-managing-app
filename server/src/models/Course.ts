import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: true },
  phoneNumber: { type: String, unique: false, required: true },
  section: { type: String, unique: false, required: true },
  birthDate: { type: Date, unique: false, required: false },
  topic: { type: String, unique: false, required: true },
  isPresident: { type: Boolean, required: true },
  email: { type: String, required: true },
});

export const Course = model("Course", CourseSchema);
