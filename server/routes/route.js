import express from "express";
const router = express.Router();

import { SingupUser } from "../controller/user-controller.js";

router.post("/signup", SingupUser);

export default router;
