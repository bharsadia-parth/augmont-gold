import { getUsers, getUserById, deleteUserById, updateUserById, createUser } from "../controllers/user.controller";
import express from "express";

const userRoutes = express.Router();
userRoutes.get("/", getUsers)
userRoutes.get("/:id", getUserById)
userRoutes.delete("/:id", deleteUserById)
userRoutes.patch("/:id", updateUserById)
userRoutes.put("/", createUser)
export default userRoutes;