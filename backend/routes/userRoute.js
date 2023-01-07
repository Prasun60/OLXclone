import express from "express";
import { getuser } from "../Controllers/userController.js";

const router = express.Router();

router.get("/getuser/:id", getuser);
export default router;
