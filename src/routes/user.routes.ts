import express from "express";
import { getUser } from "../controllers/user.controller";

const userRoutes = express.Router();
userRoutes.get("/", getUser)
export default userRoutes;