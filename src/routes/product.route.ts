import express from "express";
import { createProduct, deleteProductById, getProductById,bulkUploadProducts, getProducts, updateProductById, generateProductReport } from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";

const productRoutes = express.Router();
productRoutes.put("/", createProduct);
productRoutes.get("/generate-report", generateProductReport)
productRoutes.delete("/:id", deleteProductById);
productRoutes.patch("/:id", updateProductById);
productRoutes.get("/:id", getProductById);
productRoutes.get("/", getProducts);
productRoutes.post("/bulk-upload", upload.single('file'), bulkUploadProducts)

export default productRoutes