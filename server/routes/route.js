import express from "express";
const router = express.Router();

import { SingupUser, loginUser } from "../controller/user-controller.js";

router.post("/signup", SingupUser);
router.post("/login", loginUser);

export default router;
