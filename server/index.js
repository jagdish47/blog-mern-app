import express from "express";
import dotenv from "dotenv";

import { Connection } from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app = express();

app.use("/", Router);

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Listening at Port:", PORT);
});

const USER = process.env.DB_USERNAME;
const PASS = process.env.DB_PASSWORD;

Connection(USER, PASS);
