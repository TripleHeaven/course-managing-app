import { Mongoose } from "mongoose";
const { DATABASE_URL } = process.env;

// CONNECT TO MONGO
const mongoClient = new Mongoose();

mongoClient.connect(DATABASE_URL ?? "");

// CONNECTION EVENTS
mongoClient.connection
  .on("open", () => console.log("DATABASE STATE", "Connection Open"))
  .on("close", () => console.log("DATABASE STATE", "Connection Open"))
  .on("error", (error: any) => console.error("DATABASE STATE", error));
