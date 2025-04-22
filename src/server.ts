
import { PrismaClient } from "../generated/prisma";
import app from "./app";
import dotenv from 'dotenv'; 

dotenv.config();
app.listen(process.env.PORT || "8081", () => {
    console.log("Listening on port", process.env.PORT || "8081");
});
let client = new PrismaClient();
export default client