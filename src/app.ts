import express, { json } from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";

const corsMiddlerware = cors()
const app = express();
app.use(corsMiddlerware);
app.use(json());

app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/product", productRoutes)


export default app;
