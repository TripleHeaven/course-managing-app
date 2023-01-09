import { Router } from "express";
import { Course } from "../../models/Course.js";
import mongoose from "mongoose";

export const CourseRouter = Router();

CourseRouter.post("", async (req: any, res: any) => {
  try {
    const newCourse = await Course.create({
      id: new mongoose.mongo.ObjectId(),
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      section: req.body.section,
      birthDate: req.body.birthDate,
      topic: req.body.topic,
      isPresident: req.body.isPresident,
      email: req.body.email,
    });

    res.json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

CourseRouter.get("", async (_, res: any) => {
  try {
    const result = await Course.find();

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});
