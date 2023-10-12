import express from "express";
const router = express.Router();

import { SingupUser, loginUser } from "../controller/user-controller.js";
import { uploadImage } from "../controller/image-controller.js";

import upload from "../utils/upload.js";

router.post("/signup", SingupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);

export default router;
