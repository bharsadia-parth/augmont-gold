import express, { json } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const corsMiddlerware = cors()
const app = express();
app.use(corsMiddlerware);
app.use(json());

app.use("/user", userRoutes)


export default app;
