import { Router } from "express";
import { User } from "../../models/User.js";
import { compare, hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const UserRouter = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

const { sign } = jsonwebtoken;

// Signup route to create a new user
UserRouter.post("/signup", async (req: any, res: any) => {
  try {
    // hash the password

    const candidate = await User.findOne({ username: req.body.login });

    if (candidate) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hash(req.body.password, 10);
    // create a new user
    const user = await User.create({
      username: req.body.login,
      password: hashedPassword,
    });

    if (user) {
      //check if password matches
      const result = await compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }

    return;

    // send new user as response
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

// Login route to verify a user and get a token
UserRouter.post("/login", async (req: any, res: any) => {
  try {
    console.log(req, res);
    // check if the user exists
    const user = await User.findOne({ username: req.body.login });
    if (user) {
      //check if password matches
      const result = await compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});
