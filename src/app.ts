import express, { json } from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";

const corsMiddlerware = cors()
const app = express();
app.use(corsMiddlerware);
app.use(json());

app.use("/user", userRoutes)
app.use("/category", categoryRoutes)


export default app;
