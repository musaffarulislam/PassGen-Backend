import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import * as router from "../userRouter";

dotenv.config();

const app = express();
const port = process.env.PORT 
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS.split(',')

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json());
app.use(express.uelencoded({extended : true}))
app.use(morgan("dev"));

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`The server start at running on port ${port}`);
});