import express from "express";
import { deleteCategoryById, getCategories, getCategoryById, createCategory, updateCategoryById } from "../controllers/category.controller";

const categoryRoutes = express.Router();
categoryRoutes.get("/", getCategories)
categoryRoutes.get("/:id", getCategoryById)
categoryRoutes.delete("/:id", deleteCategoryById)
categoryRoutes.patch("/:id", updateCategoryById)
categoryRoutes.put("/", createCategory)

export default categoryRoutes;