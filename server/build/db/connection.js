import { Mongoose } from "mongoose";
const { DATABASE_URL } = process.env;
// CONNECT TO MONGO
export const mongoClient = new Mongoose();
mongoClient.connect(DATABASE_URL !== null && DATABASE_URL !== void 0 ? DATABASE_URL : "");
// CONNECTION EVENTS
mongoClient.connection
    .on("open", () => console.log("DATABASE STATE", "Connection Open"))
    .on("close", () => console.log("DATABASE STATE", "Connection Open"))
    .on("error", (error) => console.error("DATABASE STATE", error));
