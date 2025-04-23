import express from "express";
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/product.controller";

const productRoutes = express.Router();
productRoutes.put("/", createProduct);
productRoutes.delete("/:id", deleteProductById);
productRoutes.patch("/:id", updateProductById);
productRoutes.get("/:id", getProductById);
productRoutes.get("/", getProducts);

export default productRoutes