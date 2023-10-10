import express from "express";
import dotenv from "dotenv";
import { Connection } from "./database/db.js";
dotenv.config();
const app = express();

const PORT = 8000;

const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASSWORD;

Connection(USER, PASS);

app.listen(PORT, () => {
  console.log("Listening at Port:", PORT);
});
